const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 36.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// load items
window.addEventListener("DOMContentLoaded", () => {
  // template method
  displayMenuItems(menu);
  displayMenuBtns();

});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(({ img, title, price, desc }) => {
    const template = document.getElementById("template");
    const templateContent = document.importNode(template.content, true);

    templateContent.querySelector("img").setAttribute("src", img);
    templateContent.querySelector("header > h4").textContent = title;
    templateContent.querySelector(".price").textContent = price;
    templateContent.querySelector(".item-text").textContent = desc;

    return templateContent;
  });

  sectionCenter.append(...displayMenu);

  // ******************
  // injecting directly HTML via JS
  // let displayMenu = menuItems.map((item) => {
  //   // console.log(item);

  //   return `<article class="menu-item">
  //         <img src=${item.img} alt=${item.title} class="photo" />
  //         <div class="item-info">
  //           <header>
  //             <h4>${item.title}</h4>
  //             <h4 class="price">$${item.price}</h4>
  //           </header>
  //           <p class="item-text">
  //             ${item.desc}
  //           </p>
  //         </div>
  //       </article>`;
  // });
  // displayMenu = displayMenu.join("");

  // sectionCenter.innerHTML = displayMenu;
}

function displayMenuBtns() {
  // get the categories from the menu array and create a button to filter
  // for each unique category existing there
  // 1. use the Set data structure to get unique values from an array
  // const categories = new Set(menu.map(item => item.category));

  // 2. use the reduce method to get an array of unique categories
  const categories = menu.reduce(
    (acc, curr) => {
      // 1.
      // if ( !acc.includes(curr.category) ) {
      //   acc.push(curr.category);
      // }
      // return acc;

      // 2.
      return acc.indexOf(curr.category) < 0 ? acc.concat([curr.category]) : acc;

      // since we don't have an 'all' category inside our objects from menu arr
      // we need to initialize it as the first element of the reudce function
    },
    ["all"]
  );
  const categoryBtns = categories
    .map((category) => {
      // here we could also use the template for a button
      return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    })
    .join("");
    // append buttons
  btnContainer.innerHTML = categoryBtns;
  
  // get access to the newly created button elements
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");

  // filter items
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.target.dataset.id;
      const filteredMenuItems = menu.filter((item) => {
        if (item.category === category) {
          return item;
        }
      });
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(filteredMenuItems);
      }
    });
  });
}