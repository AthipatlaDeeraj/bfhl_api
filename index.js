//i am using express and node 
const express = require("express");
const app = express();
app.use(express.json());

//let me input all the required credentials of mine
const Myname = "ATHIPATLA DEERAJ KUMAR";
const DateOfBirth = "07042005";
const Email = "deeraj.22bce8574@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCE8574";
function makeUserId(fullName, dob) {
  return fullName.trim().toLowerCase().replace(/\s+/g, "_") + "_" + dob;
}

function categorizeElements(arr) {
  const even_num=[];
  const odd_nums=[];
  const alphabets=[];
  const special_characters=[];
  const allAlphaCharsInOrder=[];

  for (const item of arr){
    if (item === null||item === undefined) {
      special_characters.push(String(item));
      continue;
    }
    const s = String(item);
    if (/^[+-]?\d+$/.test(s)) {
      const num = parseInt(s, 10);
      if (num % 2 === 0) even_num.push(String(num));
      else odd_nums.push(String(num));
      continue;
    }
    if (/^[A-Za-z]+$/.test(s)) {
      alphabets.push(s.toUpperCase());
      for (const ch of s) {
        if (/[A-Za-z]/.test(ch)) allAlphaCharsInOrder.push(ch);
      }
      continue;
    }
    special_characters.push(s);
    for (const ch of s) {
      if (/[A-Za-z]/.test(ch)) allAlphaCharsInOrder.push(ch);
    }
  }

  const sumVal = arr
    .map((x) => {
      if (x == null) return null;
      const s = String(x);
      return /^[+-]?\d+$/.test(s) ? parseInt(s, 10) : null;
    })
    .filter((v) => v !== null)
    .reduce((acc, v) => acc + v, 0);
  const reversed = allAlphaCharsInOrder.slice().reverse();
  const concatChars = reversed.map((ch, idx) =>
    idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  );
  const concat_string = concatChars.join("");
  return {
    even_num,
    odd_nums,
    alphabets,
    special_characters,
    sum: String(sumVal),
    concat_string,
  };
}
//now using post for routing purpose
app.post("/bfhl", (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid request: must have "data" array',
      });
    }

    const categorized = categorizeElements(req.body.data);

    const response = {
      is_success: true,
      user_id: makeUserId(Myname, DateOfBirth),
      email: Email,
      roll_number: ROLL_NUMBER,
      odd_nums: categorized.odd_nums,
      even_num: categorized.even_num,
      alphabets: categorized.alphabets,
      special_characters: categorized.special_characters,
      sum: categorized.sum,
      concat_string: categorized.concat_string,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});


app.get("/", (req, res) => {
  res.json({ message: "My api is working good" });
});

const PORT=3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
