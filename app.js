import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// TODO: Replace this with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyBY7i4zj9-XdTrw_Ddg8GcX0QFsPXp6RrQ",
    authDomain: "familywishlist-df2d7.firebaseapp.com",
    projectId: "familywishlist-df2d7",
    storageBucket: "familywishlist-df2d7.firebasestorage.app",
    messagingSenderId: "380312351135",
    appId: "1:380312351135:web:cb93bf3dcb55a6efba8daa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

signInAnonymously(auth).catch(console.error);

const form = document.getElementById("wishlist-form");
const wishlistEl = document.getElementById("wishlist");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const person = document.getElementById("person").value;
  const item = document.getElementById("item").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("link").value;

  await addDoc(collection(db, "wishlist"), {
    person, item, description, link, timestamp: Date.now()
  });

  form.reset();
});

onSnapshot(collection(db, "wishlist"), (snapshot) => {
  wishlistEl.innerHTML = "";
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.person}:</strong> ${data.item}<br>${data.description}<br>` +
                   (data.link ? `<a href="${data.link}" target="_blank">View</a>` : "");
    wishlistEl.appendChild(li);
  });
});
