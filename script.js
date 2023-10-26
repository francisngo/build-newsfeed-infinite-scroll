class NewsFeed {
	constructor() {
		this.feedWrapper = document.querySelector(".feed .wrapper");
		this._limit = 2;
		this._skip = 0;
	}

	init() {
		this.renderFeed(this._limit, this._skip);
	}

	async renderFeed(limit, skip) {
		this.observer = null;

		try {
			const feedItems = await this.fetchFeed(limit, skip);
			feedItems.forEach((feedItem) => this.renderFeedItem(feedItem));
			this.renderLoader();
			setTimeout(() => {
				this.observer = this.handleInfiniteScroll();
			}, 200);
		} catch (error) {
			throw new Error(error);
		}
	}

	async fetchFeed(limit, skip) {
		try {
			const response = await fetch(
				`https://dummyjson.com/users?limit=${limit}&skip=${skip}`
			);
			const feedItems = await response.json();
			return feedItems.users;
		} catch (error) {
			throw new Error(error);
		}
	}

	renderFeedItem(feedItemData) {
		const feedItemElement = document.createElement("div");
		feedItemElement.className = "feed-item";

		if (feedItemData.firstName) {
			const feedItemHeaderElement = document.createElement("div");
			feedItemHeaderElement.className = "name";
			feedItemHeaderElement.textContent =
				feedItemData.firstName + feedItemData.lastName;
			feedItemElement.append(feedItemHeaderElement);
		}

		if (feedItemData.image) {
			const feedItemContentElement = document.createElement("div");
			feedItemContentElement.classname = "content";
			feedItemContentElement.innerHTML = `<img src"${feedItemData.image}" alt"" />`;
			feedItemElement.append(feedItemContentElement);
		}

		this.feedWrapper.append(feedItemElement);
	}

	renderLoader() {
		const loaderElement = document.createElement("div");
		loaderElement.className = "loader";
		loaderElement.textContent = "loading...";
		this.feedWrapper.appendChild(loaderElement);
	}

	handleInfiniteScroll() {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				entries[0].target.remove();
				this._skip += 2;
				this.renderFeed(this._limit, this._skip);
			}
		});

		const loader = document.querySelector(".loader");
		observer.observe(loader);
		return observer;
	}
}

const app = new NewsFeed();
app.init();
