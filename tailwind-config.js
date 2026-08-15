/* Tailwind Play CDN palette configuration for carllochstampfor.com.
   Loaded AFTER cdn.tailwindcss.com and BEFORE first paint - both script
   tags are synchronous, so document order is the execution order. Moving
   this after the stylesheet or making it defer/async would let the page
   paint with unmapped brand colors. */

// ============================================================
//  NAVY / GOLD / PERIWINKLE prototype palette  (branch: color-navy-gold)
//  Navy       = structure / authority   (headings, borders, primary buttons, scrollbar)
//  Gold       = highlights / achievements (GPA, metric accents, key stats)
//  Periwinkle = AI / research-specific   (research cards, AI badges, paper links, timeline)
//  Implementation: the built-in `blue` family is remapped to navy and
//  `purple`/`indigo` to periwinkle, so existing utility classes recolor
//  automatically. `gold` is a new token used for achievement accents.
// ============================================================
const navyScale = { 50:'#EEF3F8', 100:'#D6E1EE', 200:'#B0C6DD', 300:'#7F9EC0', 400:'#6E97C4', 500:'#4A76A8', 600:'#305C8C', 700:'#1E3A5F', 800:'#172E4B', 900:'#0F1E33' };
const periScale = { 50:'#EEF0FE', 100:'#E0E3FD', 200:'#C7CDFB', 300:'#A5AEF9', 400:'#818CF8', 500:'#6670F0', 600:'#4F57D6', 700:'#3F45AD', 800:'#313686', 900:'#262A66' };
const goldScale = { 50:'#FBF5E9', 100:'#F5E7C6', 200:'#E9CD86', 300:'#DDB44A', 400:'#C88A1E', 500:'#A16207', 600:'#835006', 700:'#653D05', 800:'#4B2E04', 900:'#331F02' };
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'cyber-blue': '#1E3A5F',
                'research-purple': '#818CF8',
                'research-indigo': '#6670F0',
                navy:       { ...navyScale, DEFAULT: '#1E3A5F' },
                gold:       { ...goldScale, DEFAULT: '#A16207' },
                periwinkle: { ...periScale, DEFAULT: '#818CF8' },
                // Remap built-in brand families -> new palette:
                blue:   navyScale,   // navy  (structure/authority)
                purple: periScale,   // periwinkle (AI/research)
                indigo: periScale    // periwinkle (AI/research)
            }
        }
    }
}
