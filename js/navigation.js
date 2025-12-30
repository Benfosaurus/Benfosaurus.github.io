const content = document.getElementById('content');

async function loadPage(page) {
    console.log('Loading page:', page);
    try {
        const response = await fetch(`pages/${page}.html`);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Failed to load ${page}`);
        }
        const html = await response.text();
        console.log('Loaded HTML length:', html.length);
        content.innerHTML = html;

        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.classList.add('active');
        }

        attachNavListeners();

        if (page === 'project2') {
            setTimeout(() => {
                console.log('Initializing tuner');
                window.initTuner?.();
            }, 50);
        }
    } catch (error) {
        console.error('Error loading page:', error);
        content.innerHTML = '<h2>Page not found</h2><p>' + error.message + '</p>';
    }
}

function setActive(link) {
    document.querySelectorAll('nav .nav-link').forEach(l => l.classList.remove('active'));
    if (link.closest('nav')) {
        link.classList.add('active');
    }
}

function attachNavListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    console.log('Clicked link href:', href);
    const page = href.substring(1);
    console.log('Extracted page:', page);
    loadPage(page);
    setActive(this);
    window.location.hash = page;
}

attachNavListeners();

const initialPage = window.location.hash.substring(1) || 'projects';
console.log('Initial page:', initialPage);
loadPage(initialPage);