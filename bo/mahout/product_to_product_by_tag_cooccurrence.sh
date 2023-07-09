#!/bin/bash

# Instructions:
#
# Before using this script, you have to download and extract the Movielens 1M dataset
# from http://www.grouplens.org/node/73
#
# To run:  change into the mahout directory and type:
#  export MAHOUT_LOCAL=true
# Then:
#  examples/bin/factorize-movielens-1M.sh /path/to/ratings.dat

if [ "$1" = "--help" ] || [ "$1" = "--?" ]; then
  echo "This script runs the Alternating Least Squares Recommender on the Grouplens data set (size 1M)."
  echo "Syntax: $0 /path/to/ratings.dat\n"
  exit
fi

if [ $# -ne 1 ]
then
  echo -e "\nYou have to download the Movielens 1M dataset from http://www.grouplens.org/node/73 before"
  echo -e "you can run this example. After that extract it and supply the path to the ratings.dat file.\n"
  echo -e "Syntax: $0 /path/to/ratings.dat\n"
  exit -1
fi

export MAHOUT_LOCAL=true
MAHOUT="/home/lab/mahout/bin/mahout"

#MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.min.split.size=1600MB"
# MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.map.child.java.opts=-Xmx4096m"
# MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.reduce.child.java.opts=-Xmx4096m"
# MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.output.compress=true"
# MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.compress.map.output=true"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.map.tasks=11"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.reduce.tasks=11"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.job.map.memory.mb=2047"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.job.reduce.memory.mb=2047"
#MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.cluster.map.memory.mb=32000"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapred.child.java.opts=Xmx12G"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapreduce.tasktracker.map.tasks.maximum=11"
MAHOUT_OPTS="$MAHOUT_OPTS -Dmapreduce.tasktracker.reduce.tasks.maximum=11"
MAHOUT_OPTS="$MAHOUT_OPTS -Dio.sort.factor=240"
MAHOUT_OPTS="$MAHOUT_OPTS -Dio.sort.mb=2047"
#MAHOUT_OPTS="$MAHOUT_OPTS -Dio.file.buffer.size=32000"
#MAHOUT_OPTS="$MAHOUT_OPTS -Dfs.inmemory.size.mb=16000"
#MAHOUT_OPTS="$MAHOUT_OPTS -Ddfs.block.size=1073741824"

export MAHOUT_OPTS

WORK_DIR=./tmp/product_to_product_by_tag_cooccurrence

echo "removing work directory"
rm -rf ${WORK_DIR}

echo "creating work directory at ${WORK_DIR}"
mkdir -p ${WORK_DIR}/tmp

echo "Converting tags..."
cp $1 ${WORK_DIR}/tmp/tags.csv
# tail -n +2 $1 |sed -e s/::/,/g| cut -d, -f2,3 > ${WORK_DIR}/tmp/tags.csv
export IFS=","
mkdir -p ${WORK_DIR}/datafiles
cat ${WORK_DIR}/tmp/tags.csv | while read a b; do touch ${WORK_DIR}/datafiles/$a; echo $b >> ${WORK_DIR}/datafiles/$a; done

echo "Creating tag sequential representations..."
$MAHOUT seqdirectory \
   -c UTF-8 \
   -chunk 2000 \
   -i ${WORK_DIR}/datafiles/ \
   -o ${WORK_DIR}/seqfiles

echo "Creating tag sparse matrix..."
$MAHOUT seq2sparse \
   -i ${WORK_DIR}/seqfiles/ \
   -o ${WORK_DIR}/vectors/ \
   -ow \
   -chunk 2000 \
   -x 100 \
   -seq \
   -n 2 \
   -s 1 \
   -md 1 \
   -ml 1 \
   -ng 1 \
   -nv

echo "Extracting rows..."
$MAHOUT rowid \
   -i ${WORK_DIR}/vectors/tfidf-vectors/part-r-00000 \
   -o ${WORK_DIR}/matrix \
   --tempDir ${WORK_DIR}/tmp

echo "Computing similarities between rows..."
$MAHOUT rowsimilarity \
   -i ${WORK_DIR}/matrix/matrix \
   -o ${WORK_DIR}/similarity \
   --similarityClassname SIMILARITY_COSINE \
   -m 20 \
   -ess \
   --maxObservationsPerColumn 10000 \
   --maxObservationsPerRow 10000 \
   --tempDir ${WORK_DIR}/tmp \
   ${MAHOUT_OPTS}

echo "Dump similarities to a readable format..."
$MAHOUT seqdumper -i ${WORK_DIR}/similarity -o ${WORK_DIR}/similarity.txt

echo -e "\nSample similarities:\n"
cat ${WORK_DIR}/similarity.txt |head
echo -e "\n\n"

echo "Dump index to a readable format..."
$MAHOUT seqdumper -i ${WORK_DIR}/matrix/docIndex -o ${WORK_DIR}/docIndex.txt

echo -e "\nSample index:\n"
cat ${WORK_DIR}/docIndex.txt |head
echo -e "\n\n"
