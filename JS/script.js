// Login functionality
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (userName === 'admin' && password === 'admin123') {
            alert('Login Successfully....!');
            window.location.href = "main.html";
        } else {
            alert("Wrong username or password");
        }
    });
}

// API
let currentStatus = 'all';

const loadData = async () => {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const result = await res.json();
    const posts = Array.isArray(result) ? result : result.data;
    displayCard(posts);
};

const searchIssues = async () => {
    const searchText = document.getElementById("search-input").value;

    if (searchText.trim() === "") {
        loadData();
        return;
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const result = await res.json();
    const posts = Array.isArray(result) ? result : result.data;

    const filteredPosts = currentStatus === 'all'
        ? posts
        : posts.filter(post => post.status?.toLowerCase() === currentStatus);

    displayCard(filteredPosts);
};

const filterIssues = async (status) => {
    currentStatus = status;
    updateButtonStyles(status);

    const searchText = document.getElementById("search-input").value;

    if (searchText.trim() !== "") {
        searchIssues();
    } else {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const result = await res.json();
        const posts = Array.isArray(result) ? result : result.data;

        const filtered = status === 'all'
            ? posts
            : posts.filter(post => post.status?.toLowerCase() === status);

        displayCard(filtered);
    }
};

const updateButtonStyles = (activeStatus) => {
    const statuses = ['all', 'open', 'closed'];
    statuses.forEach(s => {
        const btn = document.getElementById(`btn-${s}`);
        if (btn) { // বাটনটি পেজে আছে কি না চেক করে নেওয়া ভালো
            s === activeStatus ? btn.classList.add('btn-primary') : btn.classList.remove('btn-primary');
        }
    });
};

// বিস্তারিত তথ্য দেখানোর নতুন ফাংশন
const showDetails = (post) => {
    const modalContent = document.getElementById("modal-content");
    const statusColor = post.status?.toLowerCase() === 'open' ? 'bg-[#00A96E]' : 'bg-purple-500';

    modalContent.innerHTML = `
        <h2 class="text-3xl font-bold text-slate-800 mb-4">${post.title}</h2>
        <div class="flex items-center gap-3 mb-6">
            <span class="${statusColor} text-white px-4 py-1 rounded-full text-sm font-medium">
                ${post.status === 'open' ? 'Opened' : 'Closed'}
            </span>
            <p class="text-slate-500">• Opened by <span class="font-bold">${post.author || 'User'}</span> • ${post.date || '22/02/2026'}</p>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-8">
            ${post.labels ? post.labels.map(l => `<span class="border px-3 py-1 rounded-full text-[10px] font-bold uppercase text-slate-600 bg-slate-50">${l}</span>`).join('') : ''}
        </div>

        <p class="text-slate-600 text-lg mb-10 leading-relaxed">
            ${post.description}
        </p>

        <div class="flex gap-20 border-t pt-6">
            <div>
                <p class="text-slate-400 text-sm mb-1 font-medium">Assignee:</p>
                <p class="font-bold text-slate-800 text-lg">${post.author || 'User'}</p>
            </div>
            <div>
                <p class="text-slate-400 text-sm mb-1 font-medium">Priority:</p>
                <span class="bg-red-500 text-white px-6 py-1 rounded-full text-xs font-bold uppercase">
                    ${post.priority}
                </span>
            </div>
        </div>
    `;

    document.getElementById('issue_modal').showModal();
};

const displayCard = (posts) => {
    const cardContainer = document.getElementById("card-container");
    const countElement = document.getElementById("issue-count");

    if (countElement) countElement.innerText = posts ? posts.length : 0;
    cardContainer.innerHTML = "";

    if (!posts || posts.length === 0) {
        cardContainer.innerHTML = `<p class="col-span-full text-center py-10 text-gray-400">No issues found!</p>`;
        return;
    }

    posts.forEach((post, index) => {
        const div = document.createElement("div");
        div.className = "cursor-pointer h-full"; // পুরো কার্ড ক্লিকেবল করার জন্য
        div.onclick = () => showDetails(post); // ক্লিকে মডাল ওপেন হবে

        const priority = post.priority?.toLowerCase();
        let priorityClass = "text-gray-500 bg-gray-100";
        if (priority === 'high') priorityClass = "text-red-500 bg-red-50";
        if (priority === 'medium') priorityClass = "text-yellow-600 bg-yellow-50";

        const status = post.status?.toLowerCase();
        const topBorderColor = status === 'open' ? 'border-t-[#00A96E]' : 'border-t-purple-500';
        const statusIcon = status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png';

        const labelsHTML = post.labels ? post.labels.map(label => {
            const l = label.toLowerCase();
            let lColor = "text-gray-600 bg-gray-50 border-gray-200";
            let lIcon = "";

            if (l === 'bug') {
                lColor = "text-red-500 bg-red-50 border-red-100";
                lIcon = '<img src="./assets/BugDroid.png" class="w-3 h-3" alt="">';
            } else if (l === 'help wanted') {
                lColor = "text-yellow-600 bg-yellow-50 border-yellow-100";
                lIcon = '<img src="./assets/Lifebuoy.png" class="w-3 h-3" alt="">';
            } else if (l === 'enhancement') {
                lColor = "text-green-600 bg-green-50 border-green-100";
            } else if (l === 'good first issue') {
                lColor = "text-indigo-600 bg-indigo-50 border-indigo-100";
            }

            return `<span class="flex items-center gap-1 text-[10px] px-2 py-1 font-bold border ${lColor} rounded-full uppercase">${lIcon} ${label}</span>`;
        }).join("") : "";

        div.innerHTML = `
            <div class="bg-white p-4 border-t-4 ${topBorderColor} rounded shadow-sm flex flex-col justify-between h-full transition-all hover:shadow-md hover:-translate-y-1">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <img src="${statusIcon}" class="w-6 h-6" alt="">
                        <span class="text-[10px] font-bold px-3 py-1 rounded-full uppercase ${priorityClass}">
                            ${post.priority}
                        </span>
                    </div>
                    <h3 class="text-sm font-bold text-slate-800 mb-1 leading-tight line-clamp-2">${post.title}</h3>
                    <p class="text-[12px] text-slate-500 line-clamp-2 mb-4">${post.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">${labelsHTML}</div>
                </div>
                <div class="pt-4 border-t border-gray-50 text-slate-400 text-[11px]">
                    <p class="font-medium">#${index + 1} by ${post.author || 'user'}</p>
                    <p class="mt-1">${post.date || '1/15/2024'}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
};

loadData();