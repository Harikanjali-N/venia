

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
    // Load footer as fragment
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
    const fragment = await loadFragment(footerPath);

    // Clear existing content and append fragment content
    block.textContent = '';
    const footer = document.createElement('div');
    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
    block.append(footer);

    // Add a wrapper class for all sections
    footer.classList.add("footer-sections");

    // Define footer sections and their respective class names
    const footerSections = [
        { name: "Account", className: "footer-account" },
        { name: "About Us", className: "footer-about-us" },
        { name: "Help", className: "footer-help" },
        { name: "Follow Us!", className: "footer-follow-us" },
        { name: "Subscribe to Venia", className: "footer-subscribe" }
    ];

    // Get all list elements inside the footer block
    const listItems = footer.querySelectorAll(".default-content-wrapper > ul > li");

    listItems.forEach((item) => {
        const sectionTitle = item.firstChild.textContent.trim();
        
        // Find a matching section in our predefined list
        const section = footerSections.find(sec => sec.name === sectionTitle);
        
        if (section) {
            // Add individual section class
            item.classList.add(section.className);
        }
    });

    // Add a common class to all sections except the last one
    const sections = footer.querySelectorAll(".footer-account, .footer-about-us, .footer-help, .footer-follow-us, .footer-subscribe");
    sections.forEach(section => {
        section.classList.add("footer-main-sections");
    });

    // Identify and add class to the logo section
    const logoSection = footer.querySelector('li:has(.icon-logo)');
    if (logoSection) {
        logoSection.classList.add("footer-logo");
    }

    // Move the last section (logo + copyright) to a new row
    if (logoSection) {
        logoSection.classList.add("footer-logo-row");
        footer.appendChild(logoSection); // Moves it to the bottom
    }

    /*** ✅ Replace Subscribe Text with Input Field ***/
    const subscribeSection = footer.querySelector(".footer-subscribe ul li:last-child");
    if (subscribeSection) {
        // Clear existing text
        subscribeSection.textContent = '';

        // Create input field
        const input = document.createElement("input");
        input.type = "email";
        input.placeholder = "Subscribe";
        input.classList.add("subscribe-input");

        // Create subscribe button
        const button = document.createElement("button");
        button.textContent = "Subscribe";
        button.classList.add("subscribe-button");

        // Append elements to the subscribe section
        subscribeSection.appendChild(input);
        subscribeSection.appendChild(button);
    }
}
