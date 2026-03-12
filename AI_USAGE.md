# Chayns Components

This repository provides reusable React components.

All components are published as separate npm packages.

## Packages

@chayns-components/core  
Foundational UI package with reusable components, hooks and utilities such as Button, Input, Popup,
List, Filter and many more.

@chayns-components/date  
Date and time package with Calendar, OpeningTimes, DateInfo and date utility helpers.

@chayns-components/code-highlighter  
Syntax highlighting components and types for rendering formatted code blocks.

@chayns-components/color-picker  
Color selection components such as ColorPicker, ColorPickerPopup, HueSlider and TransparencySlider.

@chayns-components/devalue-slider  
Slider component for swipe-like devalue or confirmation interactions.

@chayns-components/emoji-input  
Rich input package with EmojiInput, emoji pickers and emoji conversion helpers.

@chayns-components/format  
Formatting helpers for BBCode/HTML conversion and safe text escaping.

@chayns-components/gallery  
Gallery component for presenting media with configurable gallery view modes.

@chayns-components/maps  
Map-related inputs such as PositionInput with marker, polygon and position types.

@chayns-components/navigation  
Navigation layout components such as DynamicToolbar and DynamicToolbarSpacer.

@chayns-components/person-finder  
Person search and selection components with typed filters and entry models.

@chayns-components/ranking  
Ranking components for displaying ranked entries and ranking overviews.

@chayns-components/scanner  
Code scanning components and constants for camera-based scanner integrations.

@chayns-components/swipeable-wrapper  
Wrapper component for swipe gestures with configurable action items.

@chayns-components/textstring  
Textstring provider, rendering component, hooks and utilities for localized textstring access.

@chayns-components/translation  
Adaptive translation components, provider utilities and text translation helpers.

@chayns-components/typewriter  
Typewriter animation component with configurable cursor, speed and delay options.

## Import Pattern

Always import components from their package.

Example:

import { Button } from "@chayns-components/core" import { Calendar } from "@chayns-components/date"
import { EmojiInput } from "@chayns-components/emoji-input" import { translateText } from
"@chayns-components/translation"
