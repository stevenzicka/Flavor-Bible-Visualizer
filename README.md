# Flavor Bible Visualizer 
Flavor Bible Visualizer is a project that utilizes data collected from the book 'The Flavor Bible' and represents it dynamically with a force graph creating with D3.

This project was inspired by my culinary experience and the work of Grant Achatz at Alinea. Whenever I had the desire to get a little creative in the kitchen, I would turn to 'The Flavor Bible' for inspiration. 'The Flavor Bible' is a book written by Karen Page and Andrew Dornenburg, and it includes a list of over 600 ingredients and their pairings. If an ingredient pairs with the given ingredient, it is listed in plain text below. If an ingredient goes very well, it will be bolded and if it is a perfect match it will be bold and capitalized. The list was derived from interviewing some of the top chefs from around the world, and it ends up including interesting combinations, such as crab with avocado and almonds.

My problem was that, although I had an elecronic version of the book, I found myself bouncing back and forth between pages - enough to start getting frustrated. I thought there had to be a better way to visualize this... That's when I remembered seeing Grant Achatz describing how he builds interesting dishes from scratch. He calls it "Flavor Bouncing", which is just a fancy way of saying he creates a web of ingredients that all go together in some way. If you want to see him describe it, see it [here](https://www.youtube.com/watch?v=93o3-2ygFkA&ab_channel=Foodpairing) 

This gave me an idea to turn the information from 'The Flavor Bible' into visualization application that you could manipulate to make these Flavor Bouncing webs. This is the result of that work. It is currently just a MVP (minimum viable product) to demonstrate the functionality. There are still several bugs that I will list in the known issues section. 

How was this Made? 
I used an EPUB parser to convert the electronic Flavor Bible text into text that I could manipulate. Then, I transferred that data into an excel sheet in order to do some data cleaning and assign ingredients as bold, or bold and capitalized. Three separate data sheets were created and converted to JSON for use in the D3 model - Nodes, Links, and searchData. That allowed me to reference each individually for the D3 force simulation. 


Known Issues:
 - Some items do not have any associated links, or have corrupted links and will not run. This is an issue that will be fixed with a little more data cleaning.
 - If you remove an item, it will return to the initial state, but it will not allow the user to click on that item again. 
 - Some items in the table will be doubled if more than 2 nodes have been selected. This is due to the program referencing all the main node links, which may double up if a node shares most of the same links with the previous node. 
 - Clicking on the table items to add is still in progress
 - Group colors and their legend is still in progress


Partial credit goes to [areeves87](https://github.com/areeves87/Flavor-Bible-App), he was the first person I found to create something like this and was part of the inspiration for how this data looks.
