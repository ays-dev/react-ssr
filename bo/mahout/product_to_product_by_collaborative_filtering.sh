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
MAHOUT="/usr/local/bin/mahout"
WORK_DIR=./tmp/product_to_product_by_collaborative_filtering

echo "removing work directory"
rm -rf ${WORK_DIR}

echo "creating work directory at ${WORK_DIR}"
mkdir -p ${WORK_DIR}/tmp

echo "Converting ratings..."
tail -n +2 $1 |sed -e s/::/,/g| cut -d, -f1,2,3 > ${WORK_DIR}/tmp/ratings.csv

$MAHOUT itemsimilarity \
   -i ${WORK_DIR}/tmp/ratings.csv \
   -o ${WORK_DIR}/similarity \
   --maxSimilaritiesPerItem 20 \
   --similarityClassname SIMILARITY_LOGLIKELIHOOD \
   --tempDir ${WORK_DIR}/tmp &> /dev/null

echo -e "\nSample similarities:\n"
cat ${WORK_DIR}/similarity/part-r-00000 |head
echo -e "\n\n"
