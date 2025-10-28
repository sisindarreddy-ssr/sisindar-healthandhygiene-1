document.addEventListener("DOMContentLoaded", function() {

    const scroller = document.querySelector(".image-scroller");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const scrollItems = document.querySelectorAll(".scroll-item");

    if (!scroller) {
        console.error("Scroller element not found!");
        return;
    }

    // Function to determine how much to scroll
    function getScrollAmount() {
        // Scroll by the width of one card plus its margin
        if (scrollItems.length > 0) {
            const scrollItem = scrollItems[0];
            const itemStyle = window.getComputedStyle(scrollItem);
            const itemMargin = parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
            return scrollItem.offsetWidth + itemMargin;
        }
        // Fallback to a percentage of the scroller's width
        return scroller.clientWidth * 0.8;
    }

    // Function to check button visibility
    function checkButtons() {
        // Use a small buffer (10px) for precision
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;

        // Hide "prev" button if at the start
        prevBtn.style.display = scroller.scrollLeft < 10 ? "none" : "flex";

        // Hide "next" button if at the end
        nextBtn.style.display = scroller.scrollLeft > (maxScroll - 10) ? "none" : "flex";
    }

    // Event listener for the "Next" button
    nextBtn.addEventListener("click", () => {
        const scrollAmount = getScrollAmount();
        scroller.scrollBy({
            left: scrollAmount,
            top: 0,
            behavior: "smooth" // This is the "smooth" part!
        });
    });

    // Event listener for the "Previous" button
    prevBtn.addEventListener("click", () => {
        const scrollAmount = getScrollAmount();
        scroller.scrollBy({
            left: -scrollAmount,
            top: 0,
            behavior: "smooth" // This is the "smooth" part!
        });
    });

    // Update button visibility when the user scrolls (e.g., by dragging)
    scroller.addEventListener("scroll", () => {
        // Use a timeout to avoid spamming the check function
        setTimeout(checkButtons, 200);
    });

    // Initial check when the page loads
    checkButtons();
});