Building Newsfeed with Infinite Scrolling

Instructions: You've been tasked with creating a newsfeed that display user-generated content with infinite scrolling. Your task is to develop a web application that fetches user data from a mock API endpoint and displays it in a feed. As users scroll down the feed, more content should be loaded dynamically, ensuring a seamless experience.

Input/Output Examples:
- Input: initial load of the page
- Expected Output: displays the first set of user-generated content along with a loader element

- Input: scroll to the bottom of the feed
- Expected Output: removes the loader element and appends more user-generated content to the feed

- Input: scroll to the bottom of feed again
- Expected Output: Continues appedning additional user-generated content to the feed

- Input: Limited API data available
- Expected Output: handles cases where the API doesn't have more data to load and provides appropriate feedback