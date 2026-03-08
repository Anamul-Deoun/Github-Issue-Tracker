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
const loadData = async () => {
    const loadingText = document.getElementById("loading-text");
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const result = await res.json();

    const posts = Array.isArray(result) ? result : result.data;

    if (loadingText) loadingText.style.display = "none";

    if (posts) {
        displayCard(posts);
    }
};

const displayCard = (posts) => {
    const cardContainer = document.getElementById("card-container");
    if (!cardContainer) return;

    cardContainer.innerHTML = "";

    posts.forEach((post, index) => {
        const div = document.createElement("div");

        const priority = post.priority?.toLowerCase();
        let priorityClass = "text-gray-500 bg-gray-100";
        if (priority === 'high') priorityClass = "text-red-500 bg-red-50";
        if (priority === 'medium') priorityClass = "text-yellow-600 bg-yellow-100";
        if (priority === 'low') priorityClass = "text-slate-400 bg-slate-100";

        const status = post.status?.toLowerCase();
        const topBorderColor = status === 'open' ? 'border-t-[#00A96E]' : 'border-t-purple-600';

        const statusIcon = status === 'open'
            ? '<img src="./assets/Open-Status.png" class="w-6 h-6" alt="Open">'
            : '<img src="./assets/Closed- Status .png" class="w-6 h-6" alt="Closed">';

        // const topBorderColor = status === 'open' ? 'border-t-[#00A96E]' : 'border-t-purple-600';

        const labelsHTML = post.labels ? post.labels.map(label => {
            const l = label.toLowerCase();

            let lColor = "text-gray-600 bg-gray-50 border-gray-200";
            let icon = "";

            if (l === 'bug') {
                lColor = "text-red-500 bg-red-50 border-red-100";
                icon = `<img src="./assets/BugDroid.png" class="w-3 h-3" alt="">`;
            }
            else if (l === 'help wanted') {
                lColor = "text-yellow-600 bg-yellow-50 border-yellow-100";
                icon = `<img src="./assets/Lifebuoy.png" class="w-3 h-3" alt="">`;
            }
            else if (l === 'enhancement') {
                lColor = "text-green-600 bg-green-50 border-green-100";
                // icon = `<img src="./assets/Sparkle.png" class="w-3 h-3" alt="">`; // ইমেজের বদলে ইমোজিও ব্যবহার করা যায়
            }
            else if (l === 'help wanted') {
                lColor = "text-yellow-600 bg-yellow-50 border-yellow-100";
            }
            else if (l === 'good first issue') {
                lColor = "text-indigo-600 bg-indigo-50 border-indigo-100";
            }

            return `<span class="flex items-center gap-1 text-[10px] px-2 py-1 font-bold border ${lColor} rounded-full uppercase"> ${icon} ${label} </span>`

        }).join("") : "";

        div.innerHTML = `
                    <div class="bg-white border-t-4 ${topBorderColor} rounded-lg shadow-sm flex flex-col justify-between h-full transition-all hover:shadow-md">
                        <div class="p-5 pb-3">
                            <div class="flex justify-between items-center mb-4">
                                <div class="">${statusIcon}</div>
                                <span class="text-[10px] font-bold px-3 py-1 rounded-full uppercase ${priorityClass}">
                                    ${post.priority}
                                </span>
                            </div>
                            <h3 class="text-md font-bold text-slate-800 mb-2 leading-tight line-clamp-1">${post.title}</h3>
                            <p class="text-[12px] text-slate-500 line-clamp-2 mb-4">${post.description}</p>
                            <div class="flex flex-wrap gap-2">
                                 ${labelsHTML}
                            </div>
                        </div>
                        <div class="pt-4 p-5 border-t-2 border-gray-100 text-slate-400 text-[11px]">
                            <p class="font-medium">#${index + 1} by ${post.author || 'anonymous'}</p>
                            <p class="mt-1">${post.date || '1/15/2024'}</p>
                        </div>
                    </div>
                `;
        cardContainer.appendChild(div);
    });
};

loadData();

