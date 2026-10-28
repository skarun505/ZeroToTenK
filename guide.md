# John Crackers Sivakasi Fireworks Store: System Guide

An enterprise-grade ecommerce store selling **genuine Sivakasi Diwali crackers and fireworks** (Sparklers, Chakkars, Flower Pots, Aerial Sky Shots, Hydro Bombs, Sound Walas, Gift Boxes) directly to consumers at factory-direct discounted rates.

## Core Features
1. **Direct Sivakasi Factory Pricing**: Direct-from-source discounts up to 75% OFF.
2. **Authentic Firework Products**: 170+ authentic products with high-resolution imagery and genuine batch SKUs.
3. **Safety & Green Crackers Certified**: Fully compliant with PESO and CSIR-NEERI green cracker guidelines.
4. **Dual Database Architecture**:
   - Zero-config local SQLite (`prisma/dev.db`) for immediate offline execution.
   - Cloud Supabase PostgreSQL (`crackers` schema in project `mdattxewghzooverrrxe`) for Vercel cloud deployment.
5. **Modern E-Commerce Flow**: Fast search, category filters, instant checkout with Razorpay/UPI/COD, WhatsApp order confirmation, and automated invoice PDF generation.
