// Login functionality
// document.getElementById('login-btn').addEventListener('click', () => {
//     const userName = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     if (userName === 'admin' && password === 'admin123') {
//         alert('Login Successfully....!')
//         window.location.href = "main.html";
//     }
//     else{
//         alert("Wrong username or password");
//     }

// })

// API
const loadCard = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>{
        displayCard(data.data);
    });
}
loadCard()
const displayCard = (posts) => {
    const cardContainer = document.getElementById("card-container");
    console.log(cardContainer)
    posts.forEach(post => {
        const div = document.createElement("div")
        div.innerHTML= `<div class="bg-white p-4 border-t-2 border-t-[#00A96E] rounded-sm ">
                        <div class="flex justify-between items-center">
                            <img src="./assets/Open-Status.png" alt="">
                            <button
                                class="text-[12px] p-1 font-semibold text-red-500 bg-red-200 w-20 rounded-full">${post.priority.toUpperCase()}</button>
                        </div>
                        <div class="border-b-2 border-b-[#FBFBFB] mt-3">
                            <h3 class="text-sm font-semibold">${post.title}</h3>
                            <p class="text-[12px] text-[#64748B] line line-clamp-2">${post.description}</p>
                            <div class="my-3 flex gap-1">
                                <button
                                    class="text-[12px] p-2 font-semibold text-red-500 bg-red-200  rounded-full flex items-center gap-1"> <img src="./assets/BugDroid.png" alt="">${post.labels[0].toUpperCase()}</button>
                                <button class="text-[12px] p-2 font-semibold text-red-500 bg-red-200  rounded-full flex items-center gap-1"> <img src="./assets/Lifebuoy.png" alt="">HELP
                                    WANTED</button>
                            </div>
                        </div>
                        <p class="text-[#64748B] text-[12px] pt-4">#1 by john_doe</p>
                        <p class="text-[#64748B] text-[12px]">1/15/2024</p>`
        cardContainer.appendChild(div)
    })
}
