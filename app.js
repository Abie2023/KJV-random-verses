document.addEventListener('DOMContentLoaded', () => {
    const getVerseBtn = document.getElementById('getVerseBtn');
    const verseTextEl = document.getElementById('verseText');
    const verseRefEl = document.getElementById('verseReference');
    const verseBox = document.getElementById('verseBox');
    const themeContainer = document.querySelector('.theme-container');

    let nightTimer;

    getVerseBtn.addEventListener('click', () => {
        // Clear any previous timers to prevent multiple transitions
        clearTimeout(nightTimer);

        // Transition from night to day
        themeContainer.classList.remove('night-theme');
        themeContainer.classList.add('day-theme');
        getVerseBtn.innerText = 'Get Another Verse';

        verseTextEl.innerText = 'Searching the cosmos...';
        verseRefEl.innerText = '';
        verseBox.classList.remove('show');

        // Fetch the verse
        fetch('https://labs.bible.org/api/?passage=random&type=json')
            .then(response => response.json())
            .then(data => {
                const verse = data[0];
                verseTextEl.innerText = `"${verse.text.trim()}"`;
                verseRefEl.innerText = `— ${verse.bookname} ${verse.chapter}:${verse.verse}`;
                verseBox.classList.add('show');

                // Start the timer to transition back to night after 15 seconds
                nightTimer = setTimeout(() => {
                    themeContainer.classList.remove('day-theme');
                    themeContainer.classList.add('night-theme');
                    getVerseBtn.innerText = 'Get a New Verse';
                }, 15000); // 15000 milliseconds = 15 seconds
            })
            .catch(error => {
                verseTextEl.innerText = 'Could not fetch a verse. Please try again.';
                console.error('Error fetching verse:', error);
            });
    });
});