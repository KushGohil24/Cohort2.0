const users = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=400&h=400",
    name: "Aaravi Shah",
    profession: "Frontend Developer",
    description: "Passionate about crafting clean UI and smooth web experiences."
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=400&h=400",
    name: "Riya Patel",
    profession: "Data Analyst",
    description: "Loves turning raw data into meaningful insights and visual stories."
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=400&h=400",
    name: "Karan Mehta",
    profession: "AI Engineer",
    description: "Works on NLP & machine learning models to solve real-world problems."
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&crop=faces&w=400&h=400",
    name: "Sneha Desai",
    profession: "UI/UX Designer",
    description: "Designs intuitive user interfaces with a focus on user-centered design."
  }
];
var sum = '';
users.forEach((elem)=>{
    sum += `<div class="card">
            <img src="${elem.image}" alt="User Avatar" class="avatar">
            <h2 class="name">${elem.name}</h2>
            <p class="profession">${elem.profession}</p>
            <p class="description">${elem.description}</p>
        </div>`
})
    let main = document.body.querySelector("main");
    main.innerHTML = sum;