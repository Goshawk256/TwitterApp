const username = 'rbabacan';
const baseURL = 'http://localhost:3000';

fetch(`${baseURL}/user/${username}`)
    .then(response => response.json())
    .then(userData => {
        const graph = {
            nodes: [],
            links: []
        };

        const userNode = { id: userData.username, type: 'user' };
        graph.nodes.push(userNode);

        userData.followers.forEach(follower => {
            const followerNode = { id: follower, type: 'follower' };
            graph.nodes.push(followerNode);
            graph.links.push({ source: followerNode.id, target: userNode.id });
        });

        userData.following.forEach(following => {
            const followingNode = { id: following, type: 'following' };
            graph.nodes.push(followingNode);
            graph.links.push({ source: userNode.id, target: followingNode.id });
        });

        drawGraph(graph);
    })
    .catch(error => console.error('Error fetching user data:', error));

function drawGraph(graph) {
    const width = 800;
    const height = 800;

    // D3.js tarafından oluşturulan SVG elemanını seçiyoruz.
    const svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Açıklama ekliyoruz
    // Açıklama ekliyoruz
const legend = svg.append("g")
.attr("transform", `translate(${width - 100}, 10)`);

// Yeşil kutu ekliyoruz
legend.append("rect")
.attr("width", 15)
.attr("height", 15)
.attr("fill", "green");

// Yeşil metin ekliyoruz
legend.append("text")
.attr("x", 20)
.attr("y", 12)
.text("Takip Eden");

// Kırmızı kutu ekliyoruz
legend.append("rect")
.attr("y", 20)
.attr("width", 15)
.attr("height", 15)
.attr("fill", "red");

// Kırmızı metin ekliyoruz
legend.append("text")
.attr("x", 20)
.attr("y", 32)
.text("Takip Edilen");


    // D3.js tarafından oluşturulan simülasyonu başlatıyoruz.
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-120))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Grafikteki bağlantıları temsil eden çizgileri ekliyoruz.
    const link = svg.append("g")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke", "black")   // Çizgi rengi
        .attr("stroke-width", 1);  // Çizgi kalınlığı

    // Grafikteki düğümleri temsil eden daireleri ekliyoruz.
    const node = svg.append("g")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 10)
        .attr("fill", d => {
            if (d.type === 'user') return "blue";
            else if (d.type === 'follower') return "green";
            else if (d.type === 'following') return "red";
            else return "pink";  // Diğer durumlar için varsayılan renk
        });

    // Düğümlere etiket ekliyoruz.
    const labels = svg.append("g")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .text(d => d.id)
        .attr("font-size", 4) // Yazı boyutunu buradan ayarlayabilirsiniz
        .attr("dx", -8)
        .attr("dy", 0);

    // D3.js'nin simülasyonunu güncelliyoruz.
    simulation.nodes(graph.nodes)
        .on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            // Etiketleri güncelliyoruz.
            labels
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });

    simulation.force("link")
        .links(graph.links);
}
