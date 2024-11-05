function getLinksFromHTML(html) {
    if (!html) return [];

    const parts = html.split("<a ");
    const links = [];
    for (const part of parts) {
        const str = part.slice(0, part.indexOf(">"));
        if (!str) continue;

        const regExp = /href=(\S+)/;

        const match = str.match(regExp);
        if (!match) continue;

        let url = match[1];
        if (url.at(-1) === '"' || url.at(-1) === "'") {
            url = url.slice(1, -1);
        }
        if (url) links.push(url);
    }

    return links;
}

export function findShortestPath(firstUrl, lastUrl, maxDepth, fetchSync) {
    const prevMap = new Map();
    prevMap.set(firstUrl, null);

    let depth = 1;
    let queue = [firstUrl];
    main: while (queue.length && depth <= maxDepth) {
        const nextQueue = [];

        for (const url of queue) {
            const response = fetchSync(url);
            const links = getLinksFromHTML(response);
            for (const link of links) {
                if (prevMap.has(link)) continue;
                prevMap.set(link, url);

                if (link === lastUrl) {
                    break main;
                }
                nextQueue.push(link);
            }
        }

        queue = nextQueue;
        depth++;
    }

    if (!prevMap.has(lastUrl)) return null;

    const result = [];
    let current = lastUrl;
    while (current) {
        result.push(current);
        current = prevMap.get(current);
    }

    return result.reverse();
}

function test() {
    function mockFetchSync(url) {
        const pages = {
            "http://example.com": '<a href="http://example.com/page1">Page 1</a>',
            "http://example.com/page1": "<a href=http://example.com/page2>Page 2</a>",
            "http://example.com/page2": '<a href="http://example.com/page3">Page 3</a>',
            "http://example.com/page3": '<a href="http://example.com/page4">Page 4</a>',
            "http://example.com/page4": '<a href="http://example.com/page5">Page 5</a>',
            "http://example.com/page5": '<a href="http://example.com/page6">Page 6</a>',
            "http://example.com/page6": '<a href="http://example.com/page7">Page 7</a>',
            "http://example.com/page7": '<a href="http://example.com/page8">Page 8</a>',
            "http://example.com/page8": '<a href="http://example.com/page9">Page 9</a>',
            "http://example.com/page9": '<a href="http://example.com/page10">Page 10</a>',
            "http://example.com/page10": '<a href="http://example.com/page11">Page 11</a>',
            "http://example.com/page11": '<a href="http://example.com/page12">Page 12</a>',
            "http://example.com/page12": '<a href="http://example.com/page13">Page 13</a>',
            "http://example.com/page13": '<a href="http://example.com/page14">Page 14</a>',
            "http://example.com/page14": '<a href="http://example.com/page15">Page 15</a>',
            "http://example.com/page15": '<a href="http://example.com/page16">Page 16</a>',
            "http://example.com/page16": '<a href="http://example.com/page17">Page 17</a>',
            "http://example.com/page17": '<a href="http://example.com/page18">Page 18</a>',
            "http://example.com/page18": '<a href="http://example.com/page19">Page 19</a>',
            "http://example.com/page19": '<a href="http://example.com/page20">Page 20</a>',
            "http://example.com/page20": '<a href="http://example.com/page21">Page 21</a>',
            "http://example.com/page21": '<a href="http://example.com/page22">Page 22</a>',
            "http://example.com/page22": '<a href="http://example.com/page23">Page 23</a>',
            "http://example.com/page23": '<a href="http://example.com/page24">Page 24</a>',
            "http://example.com/page24": '<a href="http://example.com/page25">Page 25</a>',
            "http://example.com/page25": '<a href="http://example.com/page26">Page 26</a>',
            "http://example.com/page26": '<a href="http://example.com/page27">Page 27</a>',
            "http://example.com/page27": '<a href="http://example.com/page28">Page 28</a>',
            "http://example.com/page28": '<a href="http://example.com/page29">Page 29</a>',
            "http://example.com/page29": '<a href="http://example.com/page30">Page 30</a>',
            "http://example.com/page30": '<a href="http://example.com/page31">Page 31</a>',
            "http://example.com/page31": '<a href="http://example.com/page32">Page 32</a>',
            "http://example.com/page32": '<a href="http://example.com/page33">Page 33</a>',
            "http://example.com/page33": '<a href="http://example.com/page34">Page 34</a>',
            "http://example.com/page34": '<a href="http://example.com/page35">Page 35</a>',
            "http://example.com/page35": '<a href="http://example.com/page36">Page 36</a>',
            "http://example.com/page36": '<a href="http://example.com/page37">Page 37</a>',
            "http://example.com/page37": '<a href="http://example.com/page38">Page 38</a>',
            "http://example.com/page38": '<a href="http://example.com/page39">Page 39</a>',
            "http://example.com/page39": '<a href="http://example.com/page40">Page 40</a>',
            "http://example.com/page40": '<a href="http://example.com/page41">Page 41</a>',
            "http://example.com/page41": '<a href="http://example.com/page42">Page 42</a>',
            "http://example.com/page42": '<a href="http://example.com/page43">Page 43</a>',
            "http://example.com/page43": '<a href="http://example.com/page44">Page 44</a>',
            "http://example.com/page44": '<a href="http://example.com/page45">Page 45</a>',
            "http://example.com/page45": '<a href="http://example.com/page46">Page 46</a>',
            "http://example.com/page46": '<a href="http://example.com/page47">Page 47</a>',
            "http://example.com/page47": '<a href="http://example.com/page48">Page 48</a>',
            "http://example.com/page48": '<a href="http://example.com/page49">Page 49</a>',
            "http://example.com/page49": '<a href="http://example.com/page50">Page 50</a>',
        };

        return pages[url] || "";
    }
    const expectedPath = [
        "http://example.com",
        "http://example.com/page1",
        "http://example.com/page2",
        "http://example.com/page3",
        "http://example.com/page4",
        "http://example.com/page5",
        "http://example.com/page6",
        "http://example.com/page7",
        "http://example.com/page8",
        "http://example.com/page9",
        "http://example.com/page10",
    ];

    const firstUrl = "http://example.com";
    const lastUrl = "http://example.com/page2";
    const maxDepth = 2;
    const result = findShortestPath(firstUrl, lastUrl, maxDepth, mockFetchSync);
    console.log(result);
}

test();
