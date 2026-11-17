
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = (n) => "₹" + n;

  // MENU ITEMS
  const MENU = [
    {
      id: 1,
      c: "Starters",
      n: "Paneer Tikka",
      d: "Clay-oven paneer, mint chutney, charred onion.",
      p: 280,
      v: 1,
      img: "images/paneer-tikka.jpg",
    },
    {
      id: 2,
      c: "Starters",
      n: "Crispy Corn Chaat",
      d: "Fried corn, tamarind, lime and chaat masala.",
      p: 190,
      v: 1,
      img: "images/crispy-corn.jpg",
    },
    {
      id: 3,
      c: "Starters",
      n: "Mushroom Soup",
      d: "Roasted mushrooms, thyme cream, garlic toast.",
      p: 170,
      v: 1,
      img: "images/mushroom-soup.jpg",
    },
    {
      id: 4,
      c: "Mains",
      n: "Butter Chicken",
      d: "Smoked tomato gravy, kasuri methi, butter naan.",
      p: 420,
      v: 0,
      img: "images/butter-chicken.jpg",
    },
    {
      id: 5,
      c: "Mains",
      n: "Dal Makhani",
      d: "Black lentils simmered overnight with cream.",
      p: 320,
      v: 1,
      img: "images/dal-makhani.jpg",
    },
    {
      id: 6,
      c: "Mains",
      n: "Wild Mushroom Risotto",
      d: "Arborio rice, parmesan, truffle oil.",
      p: 380,
      v: 1,
      img: "images/mushroom-risotto.jpg",
    },
    {
      id: 7,
      c: "Mains",
      n: "Veg Biryani",
      d: "Saffron basmati layered with vegetables and raita.",
      p: 340,
      v: 1,
      img: "images/biryani.jpg",
    },
    {
      id: 8,
      c: "Desserts",
      n: "Gulab Jamun Tart",
      d: "Warm jamun in a cardamom pastry shell.",
      p: 180,
      v: 1,
      img: "images/gulab-jamun.jpg",
    },
    {
      id: 9,
      c: "Desserts",
      n: "Chocolate Pot",
      d: "Dark chocolate, sea salt, whipped cream.",
      p: 210,
      v: 1,
      img: "images/chocolate-pot.jpg",
    },
    {
      id: 10,
      c: "Drinks",
      n: "Masala Chai",
      d: "Slow-brewed with ginger and cardamom.",
      p: 80,
      v: 1,
      img: "images/masala-chai.jpg",
    },
    {
      id: 11,
      c: "Drinks",
      n: "Mango Lassi",
      d: "Thick yogurt and ripe mango.",
      p: 130,
      v: 1,
      img: "images/mango-lassi.jpg",
    },
  ];

  // CART STORAGE
  let cart = {};

  try {
    cart = JSON.parse(localStorage.getItem("cart") || "{}");
  } catch (e) {}

  const save = () => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {}
  };

  // ROUTING
  const views = $$("main[data-view]");

  function route() {
    let cur = views[0].dataset.view;

    if (views.length > 1) {
      cur = location.hash.slice(1) || "index";

      if (!views.some((v) => v.dataset.view === cur)) {
        cur = "index";
      }

      views.forEach((v) => {
        v.hidden = v.dataset.view !== cur;
      });

      scrollTo(0, 0);
    }

    $$(".nav a").forEach((a) => {
      a.classList.toggle("on", a.dataset.p === cur);
    });

    $$(".rv", views.find((v) => !v.hidden)).forEach((e) => {
      io.observe(e);
    });
  }

  // SCROLL ANIMATION
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );

  // HEADER
  const hd = $("header.top");
  const nav = $("#nav");
  const tg = $("#tgl");

  addEventListener(
    "scroll",
    () => hd.classList.toggle("sh", scrollY > 10),
    { passive: true }
  );

  tg.onclick = () =>
    tg.setAttribute("aria-expanded", nav.classList.toggle("open"));

  nav.onclick = (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      tg.setAttribute("aria-expanded", "false");
    }
  };

  // DISH CARD WITH IMAGE
  const dish = (m) => `
    <li class="dish rv">

      <img
        src="${m.img}"
        alt="${m.n}"
        loading="lazy"
        onerror="this.style.display='none'"
      >

      <div class="top">
        <span class="nm">
          <i class="dot ${m.v ? "" : "nv"}"
          title="${m.v ? "Vegetarian" : "Non-vegetarian"}"></i>
          ${m.n}
        </span>

        <span class="lead"></span>

        <b>${money(m.p)}</b>
      </div>

      <p>${m.d}</p>

      <button
        class="add"
        data-id="${m.id}"
        aria-label="Add ${m.n} to order"
      >
        Add to order
      </button>

    </li>
  `;

  // POPULAR DISHES
  const pop = $("#popular");

  if (pop) {
    pop.innerHTML = [4, 1, 8]
      .map((i) => dish(MENU.find((m) => m.id === i)))
      .join("");
  }

  // MENU FILTERS
  const ml = $("#menuList");
  const fl = $("#filters");

  function drawMenu(c) {
    ml.innerHTML = MENU
      .filter((m) => c === "All" || m.c === c)
      .map(dish)
      .join("");

    $$(".rv", ml).forEach((e) => io.observe(e));

    $$("button", fl).forEach((b) => {
      b.classList.toggle("on", b.textContent === c);
      b.setAttribute("aria-pressed", b.textContent === c);
    });
  }

  if (ml) {
    fl.innerHTML = ["All", "Starters", "Mains", "Desserts", "Drinks"]
      .map((c) => `<button>${c}</button>`)
      .join("");

    fl.onclick = (e) => {
      if (e.target.tagName === "BUTTON") {
        drawMenu(e.target.textContent);
      }
    };

    drawMenu("All");
  }

  // CART
  const cEl = $("#cart");
  const ov = $("#ov");
  const cl = $("#cartList");

  const open = (o) => {
    cEl.classList.toggle("on", o);
    ov.classList.toggle("on", o);
    cEl.hidden = false;

    if (o) $(".x", cEl).focus();
  };

  function drawCart() {
    const ids = Object.keys(cart).filter((k) => cart[k] > 0);

    const n = ids.reduce((s, k) => s + cart[k], 0);

    let t = 0;

    cl.innerHTML =
      ids
        .map((k) => {
          const m = MENU.find((x) => x.id == k);

          t += m.p * cart[k];

          return `
            <li>
              <span>
                ${m.n}
                <br>
                <small class="mt">${money(m.p)}</small>
              </span>

              <span class="q">
                <button data-q="-1" data-id="${k}">−</button>
                <b>${cart[k]}</b>
                <button data-q="1" data-id="${k}">+</button>
              </span>
            </li>
          `;
        })
        .join("") ||
      '<li class="mt">Your order is empty. Add something tasty from the menu.</li>';

    $("#cartN").textContent = n;
    $("#cartT").textContent = money(t);
    $("#place").disabled = !n;

    save();
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest(".add,[data-q]");

    if (!a) return;

    const id = a.dataset.id;

    cart[id] = Math.max(
      0,
      (cart[id] || 0) + (a.dataset.q ? +a.dataset.q : 1)
    );

    drawCart();

    if (a.classList.contains("add")) {
      a.textContent = "Added ✓";

      setTimeout(() => {
        a.textContent = "Add to order";
      }, 1100);
    }
  });

  $("#cartBtn").onclick = () => open(true);

  ov.onclick = $(".x", cEl).onclick = () => open(false);

  addEventListener("keydown", (e) => {
    if (e.key === "Escape") open(false);
  });

  $("#place").onclick = () => {
    const t = $("#cartT").textContent;

    cart = {};

    drawCart();

    cl.innerHTML = `
      <li class="ok">
        Order placed. Total ${t}.
        It will be ready in about 30 minutes.
        This is a demo, so nothing was sent.
      </li>
    `;
  };

  // FORM VALIDATION
  const rules = {
    name: (v) =>
      v.trim().length > 1 ? "" : "Please enter your name.",

    phone: (v) =>
      /^\d{10}$/.test(v.replace(/\s/g, ""))
        ? ""
        : "Enter a 10-digit phone number.",

    email: (v) =>
      /^\S+@\S+\.\S+$/.test(v)
        ? ""
        : "Enter an email like name@example.com.",

    date: (v) =>
      v ? "" : "Choose a date.",

    time: (v) =>
      v ? "" : "Choose a time.",

    msg: (v) =>
      v.trim().length >= 10
        ? ""
        : "Write at least 10 characters.",
  };

  function bindForm(f, done) {
    if (!f) return;

    f.onsubmit = (e) => {
      e.preventDefault();

      let bad = 0;

      $$("[name]", f).forEach((i) => {
        const r = rules[i.name];

        if (!r) return;

        const m = r(i.value);

        i.parentElement.querySelector(".err").textContent = m;

        i.setAttribute("aria-invalid", !!m);

        if (m) bad++;
      });

      if (!bad) {
        const ok = document.createElement("div");

        ok.className = "ok";
        ok.setAttribute("role", "status");
        ok.innerHTML = done(new FormData(f));

        f.replaceWith(ok);
      }
    };
  }

  const bk = $("#book");

  if (bk) {
    const d = bk.elements.date;

    d.min = new Date(
      Date.now() - new Date().getTimezoneOffset() * 6e4
    )
      .toISOString()
      .slice(0, 10);

    bk.elements.time.innerHTML =
      '<option value="">Select a time</option>' +
      ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00", "22:00"]
        .map((t) => `<option>${t}</option>`)
        .join("");

    $$("[data-step]", bk).forEach((b) => {
      b.onclick = () => {
        const o = $("#gOut");

        const n = Math.min(
          12,
          Math.max(1, +o.value + +b.dataset.step)
        );

        o.value = n;
        bk.elements.guests.value = n;
      };
    });
  }

  bindForm(
    bk,
    (f) =>
      `<b>Table requested, ${f.get("name")}.</b><br>
      ${f.get("guests")} guests on ${f.get("date")} at ${f.get("time")}.
      We will confirm on ${f.get("phone")}.
      (Demo: nothing was sent.)`
  );

  bindForm(
    $("#msg"),
    (f) =>
      `<b>Thanks, ${f.get("name")}.</b><br>
      Your message was received.
      We usually reply within a day.
      (Demo: nothing was sent.)`
  );

  // HERO SLIDER
  const sl = $$(".slide");

  if (sl.length) {
    let i = 0;
    let t;
    let paused = false;

    const dots = $("#dots");

    dots.innerHTML = sl
      .map((_, k) => `<button class="d" aria-label="Slide ${k + 1}"></button>`)
      .join("");

    const show = (n) => {
      i = (n + sl.length) % sl.length;

      sl.forEach((s, k) => {
        s.classList.toggle("on", k === i);
        s.setAttribute("aria-hidden", k !== i);
      });

      $$(".d", dots).forEach((d, k) => {
        d.classList.toggle("on", k === i);
      });
    };

    const go = (n) => {
      show(n);

      clearInterval(t);

      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        t = setInterval(() => !paused && show(i + 1), 6000);
      }
    };

    $("#prev").onclick = () => go(i - 1);
    $("#next").onclick = () => go(i + 1);

    dots.onclick = (e) => {
      const k = $$(".d", dots).indexOf(e.target);

      if (k > -1) go(k);
    };

    const h = $(".hero");

    ["mouseenter", "focusin"].forEach((v) => {
      h.addEventListener(v, () => (paused = true));
    });

    ["mouseleave", "focusout"].forEach((v) => {
      h.addEventListener(v, () => (paused = false));
    });

    let x0;

    h.addEventListener(
      "touchstart",
      (e) => (x0 = e.touches[0].clientX),
      { passive: true }
    );

    h.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - x0;

      if (Math.abs(dx) > 50) {
        go(i + (dx < 0 ? 1 : -1));
      }
    });

    go(0);
  }

  // FOOTER YEAR
  $("#yr").textContent = new Date().getFullYear();

  drawCart();

  addEventListener("hashchange", route);

  route();
})();
