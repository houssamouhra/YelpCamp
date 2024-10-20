const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");
const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/yelp-camp");
mongoose.set("strictQuery", true);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "633b3dad403a7e4e1c6479ed",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, odio aperiam. Omnis facilis molestias consectetur totam nihil est cupiditate ea, aut similique pariatur in perferendis reiciendis enim sint ipsum iure!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dixnjnxpb/image/upload/v1729422419/YelpCamp/twzikb4qvhngtt6vnprt.jpg",
          filename: "YelpCamp/twzikb4qvhngtt6vnprt",
        },
        {
          url: "https://res.cloudinary.com/dixnjnxpb/image/upload/v1665418465/YelpCamp/uxmojz2z6b3pntmo3fdv.jpg",
          filename: "YelpCamp/uxmojz2z6b3pntmo3fdv",
        },
      ],
    });

    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
