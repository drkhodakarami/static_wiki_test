document.addEventListener("DOMContentLoaded", function () {
	console.log("DOMContentLoaded event fired");
	
	// Check if styles are loaded
	const styles = document.styleSheets;
	let stylesLoaded = false;
	for (let i = 0; i < styles.length; i++) {
		try {
			if (styles[i].href && styles[i].href.includes('styles.css')) {
				stylesLoaded = true;
				break;
			}
		} catch (e) {
			console.error('Error checking stylesheet:', e);
		}
	}
	if (!stylesLoaded) {
		console.error('Warning: styles.css not loaded properly');
	}

	// Generate breadcrumbs
	generateBreadcrumbs();

	// Load Shared Navigation
	fetch("/nav.html")
		.then(response => response.text())
		.then(data => {
			document.getElementById("nav-placeholder").innerHTML = data;

			// Reinitialize dropdown functionality
			document.querySelectorAll('.menu-item').forEach(item => {
				if (!item.querySelector('.arrow')) return;
				item.addEventListener('click', function () {
					this.classList.toggle('active');
				});
			});
		})
		.catch(error => console.error("Error loading navigation:", error));

	// Load Shared Head Elements
	fetch("/shared-head-elements.html")
		.then(response => response.text())
		.then(data => {
			document.getElementById("shared-head-elements").innerHTML = data;
		})
		.catch(error => console.error("Error loading head elements:", error));

	// Add copy functionality to code blocks
	document.querySelectorAll('.copy-btn').forEach(button => {
		button.addEventListener('click', function () {
			// Find the closest pre element and its code content
			const pre = this.closest('pre');
			const code = pre.querySelector('code');

			// Create a temporary textarea to copy from
			const textarea = document.createElement('textarea');
			textarea.value = code.textContent;
			document.body.appendChild(textarea);

			// Select and copy the text
			textarea.select();
			document.execCommand('copy');

			// Remove the temporary textarea
			document.body.removeChild(textarea);

			// Visual feedback
			const originalIcon = this.innerHTML;
			this.innerHTML = '<i class="fas fa-check"></i>';
			this.style.color = '#4CAF50'; // Green color for success

			// Reset button after 2 seconds
			setTimeout(() => {
				this.innerHTML = originalIcon;
				this.style.color = '';
			}, 2000);
		});
	});
});

/**
 * Generate breadcrumbs based on the current URL path
 * Adds "Home" as a link and other path segments as spans
 */
function generateBreadcrumbs() {
	// Find the breadcrumb element
	const breadcrumbElement = document.querySelector('.breadcrumb');
	if (!breadcrumbElement) return;
	
	// Get the current path and split into segments
	const path = window.location.pathname;
	const segments = path.split('/').filter(Boolean);
	
	// Start with Home link
	let breadcrumbHTML = '<a href="/">Home</a>';
	
	// Add each path segment as a span
	segments.forEach((segment, index) => {
		// Extract display name by removing .html and replacing hyphens
		let displayName = segment;
		if (displayName.endsWith('.html')) {
			displayName = displayName.substring(0, displayName.length - 5);
		}
		
		// Replace hyphens with spaces
		displayName = displayName.replace(/-/g, ' ');
		
		// Add spaces between camelCase words (e.g., EverySyntax → Every Syntax)
		displayName = displayName.replace(/([a-z])([A-Z])/g, '$1 $2');
		
		// Capitalize first letter of each word
		displayName = displayName.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		
		// Add separator and segment
		breadcrumbHTML += `<span>/</span><span>${displayName}</span>`;
	});
	
	// Set the breadcrumb HTML
	breadcrumbElement.innerHTML = breadcrumbHTML;
}