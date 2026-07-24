import fs from "fs";
import path from "path";
import https from "https";

const assets = [
  {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=80",
    dest: "public/images/home/hero-coffee-workflow.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/home/practice-espresso-dialin.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/home/practice-manual-brew-v60.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/home/practice-milk-steaming.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    dest: "public/images/home/practice-cupping-tasting.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    dest: "public/images/courses/barista-fundamentals.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80",
    dest: "public/images/courses/espresso-foundations.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
    dest: "public/images/courses/manual-brew-essentials.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80",
    dest: "public/images/lessons/lesson-extraction-basics.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    dest: "public/images/lessons/lesson-bean-varieties.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
    dest: "public/images/lessons/lesson-grinder-setup.jpg",
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`✅ Downloaded: ${dest}`);
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log("⏳ Downloading local coffee stock photography from Unsplash...");
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.dest);
    } catch (e) {
      console.error(`Failed ${asset.dest}:`, e);
    }
  }
  console.log("🎉 Asset download complete!");
}

run();
