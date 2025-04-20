// STEP 1 – Form Submission
document.getElementById("infoForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
  
    if (phoneInput.value.trim() === "") {
      phoneError.style.display = "block";
      phoneInput.style.borderColor = "red";
    } else {
      phoneError.style.display = "none";
      phoneInput.style.borderColor = "#ccc";
      window.location.href = "step2.html";
    }
  });
  


// STEP 2 – Plan Selection & Toggle
const billingToggle = document.getElementById("billingToggle");
const prices = document.querySelectorAll(".plan-price");
const freeLabels = document.querySelectorAll(".plan-free"); 

billingToggle?.addEventListener("change", () => {
  const isYearly = billingToggle.checked;

  prices.forEach(price => {
    price.textContent = isYearly
      ? price.dataset.yearly
      : price.dataset.monthly;
  });

  // Show or hide "2 months free" based on billing type
  freeLabels.forEach(label => {
    label.style.display = isYearly ? "block" : "none";
  });
});

document.getElementById("planForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedPlan = document.querySelector('input[name="plan"]:checked');

  if (!selectedPlan) {
    alert("Please select a plan.");
  } else {
    const billingType = billingToggle.checked ? "Yearly" : "Monthly";
    localStorage.setItem("selectedPlan", selectedPlan.value);
    localStorage.setItem("billingType", billingType);

    window.location.href = "step3.html";
  }
});



  
  // STEP 3 – Add-ons Selection
  document.addEventListener('DOMContentLoaded', function () {
    const addonsForm = document.getElementById('addonsForm');
  
    addonsForm?.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const selectedAddons = Array.from(
        document.querySelectorAll('input[name="addon"]:checked')
      ).map(input => input.value);
  
      localStorage.setItem('addons', JSON.stringify(selectedAddons));
      window.location.href = 'step4.html';
    });
  });
  

  // STEP 4 – Display Summary
document.addEventListener('DOMContentLoaded', function () {
    const summaryBox = document.getElementById("summaryBox");
    const totalPriceEl = document.getElementById("totalPrice");
    const billingLabel = document.getElementById("billingType");
  
    const plan = localStorage.getItem("selectedPlan") || "Arcade";
    const billingType = localStorage.getItem("billingType") || "Monthly";
    const addons = JSON.parse(localStorage.getItem("addons")) || [];
  
    let planPrice = 9;
    const addonPrices = {
      "Online service": 1,
      "Larger storage": 2,
      "Custom profile": 2
    };
  
    if (billingType === "Yearly") {
      planPrice = 90;
      addonPrices["Online service"] = 10;
      addonPrices["Larger storage"] = 20;
      addonPrices["Custom profile"] = 20;
    }
  
    billingLabel.textContent = billingType;
    let total = planPrice;
  
    const planHTML = `
      <div class="summary-header">
        <div>
          <strong>${plan} (${billingType})</strong>
          <a href="step2.html">Change</a>
        </div>
        <span>$${planPrice}/${billingType === "Yearly" ? "yr" : "mo"}</span>
      </div>
    `;
  
    let addonsHTML = "";
    addons.forEach(addon => {
      const price = addonPrices[addon] || 0;
      total += price;
      addonsHTML += `
        <div class="summary-item">
          <span>${addon}</span>
          <span>+$${price}/${billingType === "Yearly" ? "yr" : "mo"}</span>
        </div>
      `;
    });
  
    summaryBox.innerHTML = planHTML + addonsHTML;
    totalPriceEl.textContent = `+$${total}/${billingType === "Yearly" ? "yr" : "mo"}`;
  });
  
  // Confirmation Button
  function confirmOrder() {
    alert("Your subscription has been confirmed!");
    // window.location.href = "thank-you.html";
  }
  



//   active steps


document.addEventListener("DOMContentLoaded", () => {
    const stepItems = document.querySelectorAll(".step-item");
  
    // Detect current step from filename
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf("/") + 1);
    let currentStep = 1;
  
    if (filename.includes("step2")) currentStep = 2;
    else if (filename.includes("step3")) currentStep = 3;
    else if (filename.includes("step4")) currentStep = 4;
  
    // Apply active class
    stepItems.forEach(item => {
      item.classList.remove("active");
      if (parseInt(item.dataset.step) === currentStep) {
        item.classList.add("active");
      }
    });
  });

  



//   confirmation page


function confirmOrder() {
    const formSection = document.querySelector('.form-section');
  
    formSection.innerHTML = `
      <div class="thank-you-screen">
        <img src="/images/red-circle-with-white-arrow-pointing-right_1309087-11021.jpg" alt="Thank You" class="thank-you-icon" />
        <h1>Thank you!</h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using our platform.
          If you ever need support, please feel free to email us at
          <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>.
        </p>
      </div>
    `;
  }
  