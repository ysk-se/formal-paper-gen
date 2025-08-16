// 数字を漢数字に変換するマッピング
const numMap = {
  "0": "〇", "1": "一", "2": "二", "3": "三", "4": "四",
  "5": "五", "6": "六", "7": "七", "8": "八", "9": "九"
};

// 入力文字を整形
function formatText(str) {
  if (!str) return "";

  // 半角全角数字を漢数字に変換
  str = str.replace(/[0-9０-９]/g, d => {
    const half = String.fromCharCode(d.charCodeAt(0) & 0xFF); // 全角→半角
    return numMap[half] || d;
  });

  // 半角/全角ハイフンを縦棒に変換
  str = str.replace(/[-－ー―]/g, "|");

  return str;
}

// タブ切り替え
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".form-area").forEach(area => area.style.display = "none");
    document.getElementById(tab.dataset.target).style.display = "block";
  });
});

// 入力内容をサンプルに反映
const inputs = ["name","addr1","addr2","addr3"].map(id => document.getElementById(id));
inputs.forEach(input => {
  if (input) {
    input.addEventListener("input", () => {
      const [name, addr1, addr2, addr3] = inputs.map(i => i ? formatText(i.value) : "");
      document.getElementById("sample").innerText = `${name}\n${addr1}\n${addr2}\n${addr3}`;
    });
  }
});

// サイズ切り替え
document.querySelectorAll(".size-tab").forEach(sizeTab => {
  sizeTab.addEventListener("click", () => {
    document.querySelectorAll(".size-tab").forEach(t => t.classList.remove("active"));
    sizeTab.classList.add("active");

    const sample = document.getElementById("sample");
    sample.classList.remove("small","medium","large");
    sample.classList.add(sizeTab.dataset.size);
  });
});

// フォント切り替え
document.querySelectorAll(".font-tab").forEach(fontTab => {
  fontTab.addEventListener("click", () => {
    document.querySelectorAll(".font-tab").forEach(t => t.classList.remove("active"));
    fontTab.classList.add("active");

    const sample = document.getElementById("sample");
    sample.classList.remove("font-mincho","font-gothic","font-brush");
    sample.classList.add("font-" + fontTab.dataset.font);
  });
});
