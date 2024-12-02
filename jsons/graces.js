/* eslint-disable */
const graces = {
  "asbel": {
    "draw": {
      "Arte Name": "Draw",
			"JP Name": "抜刀(Battou)",
			"Enabled Effects": "-",
			"Enemy Attributes": "-",
			"Damage Type": "-",
			"Total Damage (%)": "100",
			"Damage Multiplier (per hit)": "1.00",
			"Max Hits": "1",
			"CC Cost": "1",
			"Notes" : "- activated by pressing the Assault Artes button while the Burst Artes style is active\n- if Asbel is within melee distance of the target, he will perform a slow attack that sheathes his blade if Asbel is further away, he will not attack but simply sheathe his blade in a quick motion\n- returns sword to sheathed state to allow Asbel to chain into Assault Artes\n- heals a small amount of HP to self based on physical defense and the number of artes chained together while Asbel was in Burst Artes style",
			"Mastery": ['-', '-']
    },
    "lightning strike": {
      "Arte Name": "Lightning Strike",
			"JP Name": "雷斬衝(Raizanshou)",
      "Enabled Effects": "-",
      "Enemy Attributes": "Nova",
      "Damage Type": "Slash",
      "Total Damage (%)": "210",
      "Damage Multiplier (per hit)": "1.05",
      "Max Hits": "2",
      "CC Cost": "2",
      "Notes": "-",
      "Mastery": [100, 800]
    },
  },
  "kidnamedflower": {
    "elegant flash": {
      "Arte Name": "Elegant Flash",
      "JP Name": "仁麗閃(Jinreisen)",
      "Enabled Effects": "-",
      "Enemy Attributes": "Human, Nova",
      "Damage Type": "Slash",
      "Total Damage (%)": "180",
      "Damage Multiplier (per hit)": "0.90",
      "Max Hits": "2",
      "CC Cost": "2",
      "Notes": "-",
      "Mastery": [100, 450]
    },
    "lucent palisade": {}
  },
};

module.exports = { graces };