// // async function getRec() {
// //     let item = document.getElementById("item").value;
// //     let title = document.getElementById("title");
// //     let output = document.getElementById("output");

// //     output.innerHTML = "Loading...";

// //     let response = await fetch("http://127.0.0.1:5000/recommend", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({ item: item })
// //     });

// //     let data = await response.json();

// //     title.innerText = "People also buy with " + data.input_item;

// //     output.innerHTML = "";

// //     if (data.recommendations.length === 0) {
// //         output.innerHTML = "<div>No recommendations found</div>";
// //     } else {
// //         data.recommendations.forEach(i => {
// //             output.innerHTML += `<div>🛍️ ${i}</div>`;
// //         });
// //     }
// // }

// // new code
// document.addEventListener("DOMContentLoaded", () => {
//     const input = document.getElementById("item");

//     // Enter key support
//     input.addEventListener("keypress", function (e) {
//         if (e.key === "Enter") {
//             getRec();
//         }
//     });
// });

// async function getRec() {
//     let item = document.getElementById("item").value.trim();
//     let title = document.getElementById("title");
//     let output = document.getElementById("output");

//     // Empty input check
//     if (!item) {
//         alert("Please enter an item");
//         return;
//     }

//     // Loading UI
//     output.innerHTML = "<div class='loader'></div>";
//     title.innerText = "";

//     try {
//         let response = await fetch("/recommend", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ item: item })
//         });

//         let data = await response.json();
//         console.log(data); // debug

//         // Handle backend error
//         if (data.error) {
//             output.innerHTML = `<div style="color:red">${data.error}</div>`;
//             return;
//         }

//         // Show title
//         title.innerText = "People also buy with " + data.input_item;

//         output.innerHTML = "";

//         // No recommendations
//         if (!data.recommendations || data.recommendations.length === 0) {
//             output.innerHTML = "<div>No recommendations found</div>";
//             return;
//         }

//         // Show results
//         data.recommendations.forEach((i, index) => {
//             if (index === 0) {
//                 output.innerHTML += `<div style="color:green;font-weight:bold">⭐ ${i}</div>`;
//             } else {
//                 output.innerHTML += `<div>🛍️ ${i}</div>`;
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         output.innerHTML = "<div style='color:red'>⚠️ Server not running or connection error</div>";
//     }
// }





document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("item");

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            getRec();
        }
    });
});

function getEmoji(item) {
    if (item.includes("milk")) return "🥛";
    if (item.includes("bread")) return "🍞";
    if (item.includes("coffee")) return "☕";
    if (item.includes("pizza")) return "🍕";
    if (item.includes("burger")) return "🍔";
    return "🛍️";
}

async function getRec() {
    let item = document.getElementById("item").value.trim();
    let title = document.getElementById("title");
    let output = document.getElementById("output");

    if (!item) {
        alert("Enter an item");
        return;
    }

    output.innerHTML = "<div class='loader'></div>";
    title.innerText = "";

    try {
        let response = await fetch("/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item: item })
        });

        let data = await response.json();

        if (data.error) {
            output.innerHTML = `<div style="color:red">${data.error}</div>`;
            return;
        }

        title.innerText = "People also buy with " + data.input_item;

        output.innerHTML = "";

        if (!data.recommendations || data.recommendations.length === 0) {
            output.innerHTML = "<div>No recommendations found</div>";
            return;
        }

        data.recommendations.forEach((i, index) => {
            if (index === 0) {
                output.innerHTML += `<div class="card best">⭐ ${getEmoji(i)} ${i}</div>`;
            } else {
                output.innerHTML += `<div class="card">${getEmoji(i)} ${i}</div>`;
            }
        });

    } catch (err) {
        output.innerHTML = "<div style='color:red'>Server error</div>";
    }
}