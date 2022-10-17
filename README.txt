Flavor Bible Matrix is a project that utilizes data collected from the book 'The Flavor Bible' and represents it with a visual node graph.


Problems:
Collecting data directly from the book would prove to be difficult. Someone already decided to do all the hard work for us (LINK) - however, this data still needed some scraping in order to get the functionality I wanted. In the book, there are words that are bolded, capitalized, or both. This signifies how well that flavor combination works. I utilized an EPUB parser to extract the text and metadata from the EPUB file. Then, I used the metadata to determine which ingredients were bold and/or capitalized and updating the excel sheet accordingly.