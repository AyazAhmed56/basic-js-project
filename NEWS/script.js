let data = {
  status: "ok",
  totalResults: 7548,
  articles: [
    {
      source: {
        id: "wired",
        name: "Wired",
      },
      author: "Steven Levy",
      title: "Trump's Crypto Embrace Could Be a Disaster for Bitcoin",
      description:
        "At the Bitcoin 2024 conference in Nashville, Donald Trump promised the crypto community the moon. They'd better hope they don't get it.",
      url: "https://www.wired.com/story/donald-trump-bitcoin-reserve-promises/",
      urlToImage:
        "https://media.wired.com/photos/66ab594d0c0cc4819f595db4/191:100/w_1280,c_limit/073024_Crypto%20get%20rich%20quick.jpg",
      publishedAt: "2024-08-02T13:00:00Z",
      content:
        "Donald Trump is an unlikely crypto ally. The power of bitcoin, embodied in Satoshi Nakamotos founding document, is that it frees participants from murky assessments of trust, instead relying on the b… [+4248 chars]",
    },
    {
      source: {
        id: null,
        name: "Gizmodo.com",
      },
      author: "Passant Rabie",
      title: "Crypto Bro Charters Private SpaceX Mission to Earth’s Poles",
      description:
        "Fram2 could fly as early as this year, marking SpaceX's seventh private crew of astronauts.",
      url: "https://gizmodo.com/crypto-bro-charters-private-spacex-mission-to-earths-poles-2000486329",
      urlToImage:
        "https://gizmodo.com/app/uploads/2024/08/SpaceX-Private-Mission.jpeg",
      publishedAt: "2024-08-13T16:05:37Z",
      content:
        "A private crew of astronauts that includes a cinematographer and an explorer, and commanded by a wealthy bitcoin entrepreneur, will be the first human spaceflight to go over Earth’s polar region. Sp… [+2136 chars]",
    },
    {
      source: {
        id: null,
        name: "Yahoo Entertainment",
      },
      author: "Jeremy Gan",
      title: "Proton Drive now has a tier for business users",
      description:
        "Proton Drive from Swiss technology company Proton AG now has a Professional tier. It joins services like Proton Mail, Proton VPN, and Proton Pass to receive professional tiers, letting teams select a single individual product that they need rather than signin…",
      url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_21a908a3-4282-421e-b244-52b23957d2d3",
      urlToImage: null,
      publishedAt: "2024-08-27T14:30:09Z",
      content:
        "If you click 'Accept all', we and our partners, including 237 who are part of the IAB Transparency & Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]",
    },
    {
      source: {
        id: "business-insider",
        name: "Business Insider",
      },
      author: "kcloonan@insider.com (Kelly Cloonan)",
      title:
        "The number of bitcoin millionaires has soared 111% in the last year as the cryptocurrency rallies",
      description:
        "The number of bitcoin millionaires has soared as  the crypto rallies. There have also been six new crypto billionaires minted in the past year.",
      url: "https://markets.businessinsider.com/news/currencies/bitcoin-millionaires-crypto-rally-cryptocurrency-etf-billionaires-sec-ethereum-wealth-2024-8",
      urlToImage:
        "https://www.businessinsider.com/public/assets/logos/og-image-logo-social.png?v=2023-11",
      publishedAt: "2024-08-27T18:50:37Z",
      content:
        "As crypto rallies, the number of bitcoin millionaires has more than doubled in the last year. According to a new report from New World Wealth and Henley & Partners, the number of bitcoin  million… [+2414 chars]",
    },
  ],
}; // No trailing comma here

let newsContainer = document.getElementById("news-container");

function load_data() {
  newsContainer.innerHTML = "";
  data.articles.forEach((article) => {
    if (article.title) {
      let newsCard = document.createElement("div");
      newsCard.className = "news-card";

      let newsImage = document.createElement("img");
      newsImage.className = "news-image";
      newsImage.src =
        article.urlToImage ||
        "https://varad177.github.io/portfolio/assets/education/seclg.jpeg"; // Fallback image if urlToImage is null
      newsImage.alt = "News Image";

      // Create content container
      let newsContent = document.createElement("div");
      newsContent.className = "news-content";

      let newsTitle = document.createElement("h2");
      newsTitle.className = "news-title";
      newsTitle.innerText = article.title;

      let newsDescription = document.createElement("p");
      newsDescription.className = "news-description";
      newsDescription.innerText = article.description;

      let newsMeta = document.createElement("p");
      newsMeta.className = "news-meta";
      let date = new Date(article.publishedAt).toLocaleDateString();
      newsMeta.innerText = `{By ${article.author} | Published on: ${date}}`;

      let newsLink = document.createElement("a");
      newsLink.className = "news-link";
      newsLink.href = article.url;
      newsLink.target = "_blank";
      newsLink.innerText = "Read Full Article";

      newsContent.appendChild(newsTitle);
      newsContent.appendChild(newsDescription);
      newsContent.appendChild(newsMeta);
      newsContent.appendChild(newsLink);

      newsCard.appendChild(newsImage);
      newsCard.appendChild(newsContent);

      newsContainer.appendChild(newsCard);
    }
  });
}

async function GetsNews() {
  const apiKey = "85c68b84733341b2814144cb773ede8f";

  let q = document.getElementById("search");
  let query = q.value;

  let url = "";
  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=all&apiKey=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = null;
    const news = await response.json();

    data = news;

    load_data();

    // displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching the Bitcoin news:", error);
  }
}

document.addEventListener("DOMContentLoaded", GetsNews());
