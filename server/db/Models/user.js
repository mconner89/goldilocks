module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      pronouns: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_photo: DataTypes.STRING,
      swapCount: DataTypes.INTEGER,
      guestRating: DataTypes.FLOAT,
      hostRating: DataTypes.FLOAT,
      inviteCount: DataTypes.INTEGER,
      userBio: DataTypes.STRING(1234),
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.Thread);
    User.hasMany(models.Message);
    User.hasMany(models.Bulletin);
    User.hasMany(models.Reviews);
    User.hasOne(models.PersonalityScale);
    User.hasOne(models.Listing);
  };

  return User;
};
