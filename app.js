async function load(){
  const res = await fetch("/api/tokens");
  const data = await res.json();

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  data.forEach(t=>{
    const div = document.createElement("div");
    div.className="token";

    div.innerHTML = `
    > ${t.address}<br>
    deployer: ${t.deployer}<br>
    <a href="https://basescan.org/address/${t.address}" target="_blank">
    view
    </a>
    `;

    feed.appendChild(div);
  });
}

setInterval(load,2000);
load();
