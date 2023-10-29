module.exports = (mongoose) => {
   const { ObjectId } = mongoose.Schema.Types;
   const Tasks = mongoose.model(
      'tasks',
      mongoose.Schema({
         _id: { type: ObjectId, auto: true },
         title: {
            type: String
         },
         description: {
            type: String
         },
         questPoints: {
            type: Number
         },
         assignee: {
            type: String
         },
         reporter: {
            type: String
         },
         priority: {
            type: String
         },
         startDate: {
            type: String
         },
         endDate: {
            type: String
         },
      })
   );

   return Tasks;
};