# What is the difference between var, let, and const?

var, let, and const এগুলো JavaScript-এ variable declare করার জন্য ব্যবহার হয়। var কিওয়ার্ড অনেক পুরনো আগে var কিওয়ার্ড ভেরিয়েবল ডিক্লেয়ার করার জন্য ব্যবহার করা হতো তবে ES6 আসার পর let, and const ব্যবহার করা হয় সাধারণত const বেশি ব্যবহার করা হয়। যদি ভেরিয়েবলের মান পরিবর্তন করা না হয় তাহলে const ব্যবহার করা হয় আর যদি ভেরিয়েবলের মান পরিবর্তন করার প্রয়োজন হয় তাহলে let কিওয়ার্ড ব্যবহার করা হয়।
# What is the spread operator (...)?

Spread Operator (...) ব্যবহার করা হয় Array বা Object এর ভ্যালুগুলোকে expand (ছড়িয়ে দেওয়া) করার জন্য।
Spread Operator একটা Array/Object এর ভ্যালুগুলো আলাদা করে বের করে দেয়।

# What is the difference between map(), filter(), and forEach()?

map(), filter(), এবং forEach() —এই তিনটিই JavaScript-এর Array method। এগুলো array-এর প্রতিটি element-এর উপর কাজ করে, কিন্তু কাজ ও return value আলাদা।
1.forEach(): Array-এর প্রতিটি element-এর উপর loop চালায়। কিন্তু কিছু return করে না।
2.map(): Array-এর প্রতিটি element modify করে নতুন array তৈরি করে।
3.filter(): Condition অনুযায়ী কিছু element রেখে নতুন array তৈরি করে।

# What is an arrow function?

Arrow Function হলো JavaScript-এ ফাংশন লেখার একটি ছোট এবং আধুনিক syntax।
এটি ES6  এ যোগ হয়েছে এবং => এই চিহ্ন ব্যবহার করে লেখা হয়।

# What are template literals?

Template literals হলো JavaScript-এ string লেখার একটি পদ্ধতি যেখানে backtick (``) ব্যবহার করে এবং ${} এর মাধ্যমে variable বা expression string-এর মধ্যে বসানো যায়।