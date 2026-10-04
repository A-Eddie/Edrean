---
name: quality-design
description: 'Design and improve websites, frontend interfaces, and visual systems with high craft. Use for modern UI redesigns, responsive layouts, typography, color systems, imagery, interaction design, accessibility, and reviews where the result should feel intentional and not AI-generated.'
argument-hint: 'Describe the interface or design outcome to improve.'
user-invocable: true
disable-model-invocation: false
---

# Quality Design

Create interfaces that feel authored, useful, and visually specific rather than assembled from generic template patterns.

## When to Use

Use this skill when:

- redesigning a website or frontend layout
- choosing typography, colors, imagery, spacing, or motion
- making a page feel more modern, premium, editorial, technical, or distinctive
- reviewing a visual implementation for AI-template patterns
- adding or replacing visual assets
- checking responsive behavior and accessibility in a design change

## Procedure

### 1. Establish the local design surface

1. Identify the owning page, component, stylesheet, or design-system token file.
2. Read the nearby markup, styles, assets, and interaction code before editing.
3. Check for existing user changes and preserve them.
4. Identify the current visual language: type families, color variables, spacing scale, border radius, shadows, image treatment, and motion.
5. Find the cheapest useful validation: a focused test, browser preview, screenshot, accessibility check, or page-load probe.

Before the first edit, state one falsifiable local hypothesis, such as: "The page feels generic because three unrelated gradients and repeated rounded cards carry the visual hierarchy; reducing those and strengthening type scale should make the design more specific." Make the smallest edit that can test the hypothesis.

### 2. Choose a clear design direction

Select one coherent direction based on the product, audience, and existing system. Examples include:

- editorial engineer portfolio
- quiet operational dashboard
- expressive creator profile
- restrained technical documentation
- warm local-business interface

Write down the governing choices before broad styling changes:

- one primary type family and one optional utility family
- a restrained palette with a clear accent strategy
- a spacing and width system
- the role of imagery
- the motion level and interaction principle

Do not combine unrelated trends just because they are popular. A design is stronger when fewer choices reinforce one another.

### 3. Remove generic visual signals

Look for and replace:

- default or interchangeable hero sections
- excessive gradients, glows, glass effects, and decorative blobs
- identical rounded cards nested inside one another
- oversized headings used without hierarchy
- arbitrary pills, badges, and floating elements
- repetitive bounce, tilt, or scroll animations
- copy that describes the interface instead of serving the user
- placeholder imagery or unrelated stock photography

Use contrast, typography, alignment, whitespace, and content structure as the primary design tools. Add decoration only when it communicates a real idea.

### 4. Build with real content and assets

1. Preserve truthful user content and make its hierarchy clearer.
2. Prefer real product, place, object, or person imagery when the user needs to recognize the subject.
3. Use original generated assets only when they are genuinely better suited than real imagery, such as diagrams, technical illustrations, or abstract backgrounds.
4. Provide descriptive `alt` text for meaningful images; use empty alt text for decorative images.
5. Keep external image sources stable and verify they return image content. Prefer local assets when the project needs offline reliability.
6. Do not imitate a named person or brand so closely that the result becomes a copy; borrow principles, not identity.

### 5. Implement responsive structure

- Establish stable container widths and readable line lengths.
- Design the first viewport intentionally for desktop and mobile.
- Make grids collapse at meaningful content breakpoints, not arbitrary device sizes.
- Keep buttons, controls, media, and cards dimensionally stable.
- Prevent text overflow, overlap, and layout shifts.
- Ensure navigation, forms, and primary actions remain usable with touch and keyboard input.
- Respect reduced-motion preferences when adding animation.

### 6. Add interaction with purpose

Use motion to explain state, hierarchy, or navigation. Keep it limited to a few meaningful transitions. For interactive tools, provide:

- a clear idle state
- visible feedback after actions
- keyboard and pointer support
- disabled or unavailable states
- graceful behavior when browser capabilities are missing
- no automatic audio or speech without explicit user action

### 7. Validate in increasing scope

After the first substantive edit, immediately run the narrowest available validation before more exploration or patching:

1. focused behavior check or nearby test
2. editor diagnostics, typecheck, lint, or syntax check
3. live page request or dev-server health check
4. browser preview at desktop and mobile widths
5. screenshot or visual inspection for blank media, overflow, overlap, and contrast

For browser features, verify the real behavior rather than only checking that event handlers exist. For external assets, verify HTTP status and content type. Do not claim completion without fresh validation output.

### 8. Review the result as a user

Ask:

- Is the purpose clear in the first viewport?
- Does the page look like it belongs to this product and person?
- Is the strongest visual signal also the most important content?
- Does any decoration compete with reading or action?
- Does the design still work without hover, animation, or remote assets?
- Are focus states, labels, alt text, and contrast adequate?
- Does mobile feel designed rather than merely compressed?

Report remaining risks, unverified browser states, or external dependencies plainly.

## Completion Criteria

A quality design task is complete only when:

- the design direction is coherent and visible in the owning surface
- existing user changes were preserved
- real content and relevant assets are used
- desktop and mobile layouts avoid overlap and overflow
- interactive states and fallbacks work
- editor diagnostics are clean or unrelated issues are disclosed
- at least one executable or live validation check passes after the final edit
- the final summary names the changed files and any remaining limitations
