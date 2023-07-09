#!/bin/bash

# Use ALS
#   mahout splitDataset
#   mahout parallelALS
#   mahout evaluateFactorization
#   mahout recommendfactorized
sh user_to_product_by_matrix_factorization.sh ./data/ratings.csv

# Do not use ALS
#   mahout recommenditembased
#sh user_to_product_whitout_matrix_factorization.sh ./data/ratings.csv

# Use SIMILARITY_LOGLIKELIHOOD
#   mahout itemsimilarity
sh user_to_user_by_collaborative_filtering.sh ./data/ratings.csv
sh product_to_product_by_collaborative_filtering.sh ./data/ratings.csv

# Use SIMILARITY_COSINE
#   mahout seqdirectory
#   mahout seq2sparse
#   mahout rowid
#   mahout rowsimilarity
#   mahout seqdumper
sh product_to_product_by_tag_cooccurrence.sh ./data/tags.csv
