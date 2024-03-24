// wordCountHelper.js

const wordCount = (data) => {
    let wordcount = [];

    if (data.blog_intro_desc) {
        data.blog_intro_desc.forEach((e) => {
            wordcount.push(e.description)
        })
    }

    data.sectionData && data.sectionData.forEach((section) => {

        if (section.type === 'section') {
            section.data.forEach((secData) => {
                if (secData.title === 'table') {
                    secData.content.forEach((secTable) => {
                        wordcount.push(secTable)
                    })
                } else {
                    wordcount.push(secData.content);
                }
            })
        }
        if (section.type === 'recommended_reading') {
            section.data.forEach((secData) => {
                wordcount.push(secData.description)
            })
        }
        if (section.type === 'testimonials') {
            section.data.forEach((secData) => {
                wordcount.push(secData.description)
            })
        }
        if (section.type === 'faq') {
            section.data.forEach((secData) => {
                wordcount.push(secData.question)
                wordcount.push(secData.answer)
            })
        }
    })

    let count = wordcount.reduce((total, sentence) => total + sentence.length, 0);

    const wordsPerMinute = 200;
    const baseTime = 1;

    const additionalTime = Math.ceil(count / wordsPerMinute) - 1;
    const totalTime = baseTime + additionalTime + `${additionalTime > 0 ? ' mins read' : ' min read'} `;

    return totalTime;
}

export { wordCount };
