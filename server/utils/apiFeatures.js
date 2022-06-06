class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // here is the search method where we are searching with pattern
  //finding{regex} and in case sensitive to get the best results

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter function for category
  // we will make a copy of query so the original value doesn't change
  // in Js objects are passed through reference so 'this' will not copy
  filter() {
    const queryFilter = { ...this.queryStr };

    //remove fields from query that are not filters
    const deleteFields = ["keyword", "page", "limit"];
    deleteFields.forEach((key) => delete queryFilter[key]);
    // console.log(queryFilter);

    // filter for price

    // from frontend , a range will be given and that will be a object
    // that needs to be converted into a string

    let queryStr = JSON.stringify(queryFilter);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // pagination{divide the products into number of pages}

  pagination(resultPerPage) {
    const currPage = Number(this.queryStr.page);
    // console.log(currPage);
    const skipped = (currPage - 1) * resultPerPage;

    this.query = this.query.limit(resultPerPage).skip(skipped);
    return this;
  }
}

module.exports = ApiFeatures;
