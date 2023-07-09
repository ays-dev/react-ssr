UNIVERSAL RECOMMENDER SYSTEM

React SSR application featuring Mahout

Build & deploy

✅ Webpack production build (./webpack.production.config.js)
✅ Optimize CSS assets
✅ Hot reload components
✅ Hot reload CSS
✅ Hot reload reducers

Backend API

✅ Setup Express server (./api/server.js)
✅ Redirect HTTP to HTTPS
✅ Redirect to www
✅ Setup ORM
✅ Use renderToStaticNodeStream for DOM streaming (./app/serverMiddleware.js)
✅ Manually create Head metadata without

Frontend APP

✅ Setup Redux actions (./app/modules/article/articleActions.js)
✅ Setup Redux reducers (./app/modules/article/articleReducers.js)
✅ Setup Axios ressources (./app/modules/article/./app/modules/article/articleResources.js)
✅ Cancel pending Axios request on navigation
✅ Debounce Placeholder Component while fetching data for navigation (./app/views/Common/Layout.js)
✅ Handle Head metadata changes on-the-fly
✅ Debug Bootstrap columns, metadata, page line-height and height, responsive

Admin Backoffice
✅ Fetch and build Database (1.5M+ articles)
✅ Fetch and resize / convert pictures (10,000+ assets)

⏳ Interface - WIP


Machine Learning recommendations
✅ Article-to-article recommendation based on tags (10M+ recommendations)
✅ Article-to-article recommendation based on users rating
✅ User-to-article recommendation based on users rating
✅ User-to-user recommendation based on users rating

For data see :
./bo/mahout/data/movies.csv
./bo/mahout/data/ratings.csv
./bo/mahout/data/tags.csv

Scripts here :
./bo/mahout/product_to_product_by_collaborative_filtering.sh (users ratings in common)
./bo/mahout/product_to_product_by_tag_cooccurrence.sh (articles tags in common)
./bo/mahout/user_to_product_by_matrix_factorization.sh
./bo/mahout/user_to_user_by_collaborative_filtering.sh

Results :
./bo/mahout/productToProductSim.txt
./bo/mahout/productToProductSimByTags.txt
./bo/mahout/userToProductSim.txt
./bo/mahout/userToUserSim.txt