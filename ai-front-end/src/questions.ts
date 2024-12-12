const questions = [
    {
      id: 0,
      text: "What best reflects how you feel or what you want right now? (this can be changed with every newsletter sent)",
      type: "single-select",
      options: [
      "Feeling motivated to take action 🚀",
        "Searching for inspiration 🌟",
        "Looking for calm and balance 🕊️",
        "Exploring new opportunities 🌍",
        "Focused on self-improvement 🌱",
        "Seeking clarity or direction 🔍",
        "Exploring creativity 🎨",
        "Other",
      ],
    },
    {
      id: 1,
      text: "What topics excite you the most?",
      type: "multiple-select",
      options: [
        "Technology 💻",
        "Productivity 📈",
        "Health & Fitness 🏋️‍♀️",
        "Business",
        "Start-up",
        "Personal Growth 🌟",
        "Entertainment 🎬",
        "Travel 🌍✈️",
        "History 🏛️ 📜",
        "Education & Learning 📚🎓",
        "Mental Health 🧠💙",
        "Parenting & Family 👶👨‍👩‍👧‍👦",
        "Environment & Sustainability 🌱🌍",
        "Career Development 💼📊",
        "Food & Cooking 🍳🍲",
        "Science & Innovation 🔬🚀",
        "Arts & Culture 🎭🖼️",
        "Gaming 🎮🕹️",
        "Politics & Current Events 🗳️🌍",
        "Fashion & Style 👗👠",
        "Pets & Animals 🐾🐶",
        "DIY & Crafting 🛠️🎨",
        "Cyrpto 🪙₿📈",
        "Relationships 💞💬",
        "Other",
      ],
    },
    {
      id: 2,
      text: "What type of content do you consume most frequently?",
      type: "multiple-select",
      options: [
        "Videos (e.g., YouTube, TEDx) 📹",
        "Podcasts 🎧",
        "Articles & Blogs 📰",
        "Newsletters  🗞️",
        "Books & Ebooks 📚",
        "News & Current Events 🗞️",
        "Social Media Posts (e.g., Twitter, Instagram) 📱",
        "Forums & Communities (e.g., Reddit, Discord) 🗨️",
        "Visual Content (e.g., infographics, Pinterest) 🎨",
        "Courses & Tutorials (e.g., Skillshare, Udemy) 🎓",
        "Other ❓",
      ],
    },
    {
      id: 3,
      text: "List some of your favorite YouTube channels, podcasts, blogs, newsletters, or social media accounts that you love.",
      type: "text",
      options: [], // No predefined options for text input
    },
    {
      id: 4,
      text: "What's your primary goal for this newsletter?",
      type: "single-select",
      options: [
        "Stay informed on specific topics 📰",
        "Discover actionable tips 🚀",
        "Get daily/weekly motivation 💪",
        "Explore new ideas 🌍",
        "Improve productivity 📈",
        "Learn new skills 📚",
        "Other",
      ],
    },
    {
      id: 5,
      text: "How often do you want to receive the newsletter?",
      type: "single-select",
      options: ["Daily", "Weekly", "Monthly"],
    },
  ];
  
  export default questions;