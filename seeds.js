var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Sandy Hill",
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: "Aye boatswain squiffy Nelsons folly pink bilged on her anchor fire in the hole bucko brigantine hearties. Maroon jury mast hulk Sea Legs rope's end gunwalls loot hands belay spirits. Aye chandler piracy topgallant man-of-war Shiver me timbers boatswain lookout ballast lass."
  },
  {
    name: "Canyon Run",
    image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
    description: "Aye boatswain squiffy Nelsons folly pink bilged on her anchor fire in the hole bucko brigantine hearties. Maroon jury mast hulk Sea Legs rope's end gunwalls loot hands belay spirits. Aye chandler piracy topgallant man-of-war Shiver me timbers boatswain lookout ballast lass."
  },
  {
    name: "Beachey Place",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Aye boatswain squiffy Nelsons folly pink bilged on her anchor fire in the hole bucko brigantine hearties. Maroon jury mast hulk Sea Legs rope's end gunwalls loot hands belay spirits. Aye chandler piracy topgallant man-of-war Shiver me timbers boatswain lookout ballast lass."
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    }
    console.log("Removed campgrounds!");
    // Add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if(err) {
          console.log(err);
        } else {
          console.log("Added a campground!");
          Comment.create(
            {
              text: "This place is great, but I wish there was internet",
              author: "Homer"
            }, function(err, comment) {
              if(err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created a new comment!");
              }
            });
        }
      });
    });
  });
}

module.exports = seedDB;