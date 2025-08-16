import type { CrimeScenario } from '../types/game';

const scenarios: CrimeScenario[] = [
  {
    id: "jewelry_heist",
    crime: "Diamond Necklace Theft",
    story: "The prestigious Blackwood Gallery's most valuable piece, a 19th-century diamond necklace worth $2.3 million, was stolen during last night's charity gala. The theft occurred between 9:30 and 10:15 PM when the lights briefly went out during the auction. Security cameras show three individuals near the display case during the blackout. The alarm system was mysteriously disabled 15 minutes before the theft.",
    location: "Blackwood Gallery, Upper East Side",
    timeOfCrime: "9:45 PM - 10:15 PM",
    evidence: [
      {
        item: "Security Footage",
        description: "Grainy footage showing a figure in formal wear near the jewelry case",
        significance: "Person appears to know the gallery layout well"
      },
      {
        item: "Fingerprints on Display Case",
        description: "Fresh fingerprints found on the glass, partially wiped",
        significance: "Thief was wearing gloves but missed a spot"
      },
      {
        item: "Disabled Alarm Wire",
        description: "Professional cut in the alarm system's main wire",
        significance: "Requires knowledge of security systems"
      },
      {
        item: "Muddy Footprint",
        description: "Size 9 dress shoe print with distinctive wear pattern",
        significance: "Matches expensive Italian leather shoes"
      }
    ],
    suspects: [
      {
        name: "Marcus Blackwood",
        age: 45,
        occupation: "Gallery Owner",
        alibi: "Claims he was in his office during the theft, reviewing auction papers",
        motive: "Gallery is facing bankruptcy, insurance money would save business",
        evidence: "Has intimate knowledge of security systems, owns size 9 Italian shoes",
        appearance: "Tall, distinguished, always impeccably dressed",
        personality: "Charming but desperate, family legacy on the line",
        background: "Third-generation gallery owner, art history PhD from Yale",
        defenseStatement: "This gallery is my life's work, my family's legacy for over 60 years. Yes, we're struggling financially, but I would never destroy everything my grandfather built. I was in my office going through the accounts, trying to find another solution. The stress has been overwhelming, but theft? That would destroy not just the gallery, but my soul.",
        consequences: "Marcus loses the gallery anyway due to the scandal. His wife leaves him, taking their children. He becomes a pariah in the art world, ends up working as a night security guard at a shopping mall, haunted by what he lost. His family's 60-year legacy dies with his conviction."
      },
      {
        name: "Elena Vasquez",
        age: 32,
        occupation: "Art Conservator",
        alibi: "Says she was in the restoration room working on a painting",
        motive: "Recently discovered her husband's gambling debts totaling $800,000",
        evidence: "Has detailed knowledge of the gallery layout, wears size 7 shoes (doesn't match print)",
        appearance: "Petite, artistic, often paint-stained fingers",
        personality: "Perfectionist, highly skilled, recently under severe stress",
        background: "Renowned restoration expert, worked at the Met before joining Blackwood",
        defenseStatement: "I've dedicated my life to preserving art, not destroying it. Yes, my husband has gambling problems, and yes, we're in debt, but I could never steal from Marcus - he gave me a chance when the Met let me go. I was working late that night because art is where I find peace when everything else falls apart. Check the restoration logs - I was cataloging damage on the Monet until midnight.",
        consequences: "Elena's reputation in the art world is destroyed. No museum or gallery will hire her. She's forced to work at a craft store for minimum wage. Her marriage crumbles under the weight of debt and her conviction. She develops severe depression and stops creating art entirely, losing the one thing that gave her life meaning."
      },
      {
        name: "James Hartford",
        age: 38,
        occupation: "Private Security Consultant",
        alibi: "Claims he was checking perimeter security when the theft occurred",
        motive: "No apparent financial motive, well-paid consultant",
        evidence: "Designed the gallery's current security system, wears size 9 shoes, found with wire cutters",
        appearance: "Athletic build, always alert, slight scar on left hand",
        personality: "Professional, methodical, takes pride in security work",
        background: "Former police detective, started security firm after injury ended police career",
        defenseStatement: "I built that security system to be impenetrable because I believed in protecting what matters to people. Those wire cutters? I carry them for emergency repairs - it's standard equipment. I was doing my job, checking the perimeter when someone else exploited a weakness I never saw coming. My whole career is built on trust. Why would I destroy that for money I don't even need?",
        consequences: "James's security business collapses overnight. No client will trust him again. He loses his house, his car, and his self-respect. His teenage daughter refuses to speak to him, ashamed to have a 'criminal' for a father. He develops PTSD from prison and can never work in security again, ending up doing manual labor despite his back injury."
      }
    ],
    guiltyParty: 0,
    solution: "Marcus Blackwood staged the theft for insurance money. The wire cutters found on James were planted. Marcus used his intimate knowledge of the gallery and security system to disable the alarm and create the perfect opportunity during the power outage. His size 9 Italian shoes match the footprint, and he had both means and motive - the gallery's bankruptcy would destroy his family legacy."
  },
  {
    id: "mansion_murder",
    crime: "Murder at Ravenshollow Manor",
    story: "Lord Pemberton, 67, was found dead in his study at 11:30 PM by his butler. The cause of death was poisoning from a rare toxin found in his evening brandy. The manor was hosting a small dinner party for potential business partners discussing a lucrative mining deal. The victim had recently changed his will, cutting off two family members. The study door was locked from the inside, with the key found in Lord Pemberton's pocket.",
    location: "Ravenshollow Manor, English Countryside",
    timeOfCrime: "10:00 PM - 11:30 PM",
    evidence: [
      {
        item: "Poisoned Brandy Glass",
        description: "Lord Pemberton's personal snifter with traces of exotic plant toxin",
        significance: "Toxin is extremely rare, requires specialized knowledge to obtain"
      },
      {
        item: "Recently Changed Will",
        description: "Will dated one week ago, removing two beneficiaries entirely",
        significance: "Shows recent family conflict over inheritance"
      },
      {
        item: "Laboratory Equipment Receipt",
        description: "Receipt for specialized chemistry equipment found in guest room trash",
        significance: "Someone had access to equipment needed to extract/prepare poison"
      },
      {
        item: "Threatening Letter",
        description: "Anonymous note warning Lord Pemberton about 'consequences of greed'",
        significance: "Someone wanted to intimidate him before killing him"
      }
    ],
    suspects: [
      {
        name: "Victoria Pemberton",
        age: 35,
        occupation: "Biochemist",
        alibi: "Claims she was in the garden smoking when her father died",
        motive: "Recently cut from father's will due to her gambling addiction",
        evidence: "PhD in biochemistry, would know how to extract rare toxins, has access to lab equipment",
        appearance: "Elegant but hollow-eyed, expensive clothes but trembling hands",
        personality: "Brilliant but self-destructive, desperate and unpredictable",
        background: "Former pharmaceutical researcher, lost job due to gambling debts",
        defenseStatement: "Father cutting me from the will was devastating, but it wasn't about money - it was about his love. I've made mistakes with gambling, yes, but I would never hurt him. I was in the garden because I couldn't bear to see the disappointment in his eyes anymore. That lab equipment? I was trying to develop a new compound to sell, to prove I could still contribute something worthwhile to this family.",
        consequences: "Victoria is sentenced to life in prison. Her brilliant mind deteriorates in isolation. Her gambling addiction is replaced by severe mental illness. She spends her days writing equations on her cell walls, her genius wasted. Her younger brother visits once, then never again, unable to bear seeing what she's become."
      },
      {
        name: "Henry Pemberton",
        age: 42,
        occupation: "Failed Entrepreneur",
        alibi: "Says he was in the library making business calls to investors",
        motive: "Also cut from the will, facing bankruptcy from failed business ventures",
        evidence: "No scientific background, but desperate for money and furious about the will",
        appearance: "Disheveled, expensive suit poorly maintained, stress-aged",
        personality: "Charming facade hiding deep resentment and desperation",
        background: "Multiple failed businesses, living off family money until recently cut off",
        defenseStatement: "I admit I was angry about the will, furious even. But father was right - I am a failure. Every business I've touched has crumbled. But I'm not a killer! I was desperately calling investors, trying to save my latest venture without crawling back to him for money. The library phone records will show my calls. I may be a disappointment, but I'm not a murderer.",
        consequences: "Henry's life becomes a nightmare in prison. His soft upbringing makes him a target for violence. He's attacked repeatedly and develops severe anxiety. His wife divorces him and moves abroad with their children, who grow up believing their father is dead. He attempts suicide twice before finishing his sentence broken and alone."
      },
      {
        name: "Dr. Rebecca Ashford",
        age: 29,
        occupation: "Botanical Researcher",
        alibi: "Claims she was reviewing mining survey documents in her room",
        evidence: "Expert in rare toxic plants, had legitimate access to laboratory equipment for her research",
        motive: "Opposes the mining deal that would destroy rare plant habitats she's spent years studying",
        appearance: "Professional, passionate about conservation, carries herself with quiet intensity",
        personality: "Brilliant, principled, willing to sacrifice everything for her beliefs",
        background: "Leading expert on endangered plant species, has published extensively on conservation",
        defenseStatement: "Lord Pemberton's mining deal would have destroyed irreplaceable ecosystems containing plants that could hold cures for diseases we haven't even discovered yet. But I'm a scientist, not a vigilante. I came here to present evidence, to change his mind with facts and research. That's who I am - someone who believes in the power of knowledge to change hearts and minds, not violence.",
        consequences: "Dr. Ashford's conviction destroys her life's work. Her research on potentially life-saving plants is abandoned. She's banned from academic institutions and her conservation efforts collapse. The mining deal proceeds without opposition, destroying the very ecosystems she died trying to protect. She spends 25 years in prison knowing that countless species went extinct because she wasn't there to save them."
      }
    ],
    guiltyParty: 2,
    solution: "Dr. Rebecca Ashford poisoned Lord Pemberton using her expertise in toxic plants. She was motivated not by personal gain but by environmental activism - the mining deal would have destroyed irreplaceable ecosystems. She used her legitimate access to laboratory equipment to extract the rare toxin and delivered it through his evening brandy ritual, which she had observed during her stay. Her scientific knowledge made her the only one capable of obtaining and preparing such an exotic poison."
  }
];

let currentScenarioIndex = 0;

export const generateCrimeScenario = (): CrimeScenario => {
  const scenario = scenarios[currentScenarioIndex];
  currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
  return scenario;
};