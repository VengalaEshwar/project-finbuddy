import mongoose from 'mongoose';

// Connect to MongoDB
const DB_URI = "mongodb+srv://ankithkumar9618:ankithkumar9618@finbuddy.i0mra.mongodb.net/FinBuddy";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("✅ Connected to MongoDB");

        const db = mongoose.connection;
        const modulesCollection = db.collection("modules");
        const questionsCollection = db.collection("questions");

        // Fetch all modules
        const modules = await modulesCollection.find().toArray();

        for (const module of modules) {
            const moduleId = module._id;
            const questionIds = module.questions || [];

            if (questionIds.length === 0) continue;

            // Update all questions to reference the correct module ID
            await questionsCollection.updateMany(
                { _id: { $in: questionIds } },
                { $set: { moduleType: moduleId } }
            );

            console.log(`✅ Updated ${questionIds.length} questions for module: ${module.title}`);
        }

        console.log("🚀 All questions updated with correct moduleType!");
        mongoose.disconnect();
    })
    .catch(err => {
        console.error("❌ Failed to connect to MongoDB", err);
    });
