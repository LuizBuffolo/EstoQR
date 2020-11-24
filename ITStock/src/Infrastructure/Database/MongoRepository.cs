using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Infrastructure.Data
{
    public class MongoRepository<T> : Database.Interfaces.IRepository<T> where T : Core.Entities.Interfaces.IPersistable
    {
        private readonly MongoClient client;
        private readonly IMongoDatabase db;
        protected readonly IMongoCollection<T> collection;

        public MongoRepository()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            IConfigurationRoot config = builder.Build();

            string url = config["DatabaseProperties:Address"];
            int port = Convert.ToInt32(config["DatabaseProperties:Port"]);
            string name = config["DatabaseProperties:Name"];

            var settings = new MongoClientSettings
            {
                Server = new MongoServerAddress(url, port)
            };

            MongoDB.Bson.Serialization.BsonClassMap.RegisterClassMap<T>(cm =>
            {
                cm.AutoMap();
                cm.MapIdProperty(c => c.Id)
                    .SetIdGenerator(MongoDB.Bson.Serialization.IdGenerators.StringObjectIdGenerator.Instance)
                    .SetSerializer(new MongoDB.Bson.Serialization.Serializers.StringSerializer(BsonType.ObjectId));
            });

#if DEBUG
            settings.UseTls = false;
#endif

            client = new MongoClient(settings);
            db = client.GetDatabase(name);
            collection = db.GetCollection<T>(typeof(T).Name);
        }

        public IEnumerable<T> GetAll()
        {
            return collection.Find(Builders<T>.Filter.Empty).ToList();
        }

        public IEnumerable<T> GetByAttribute(string attribute, string value)
        {
            return collection.Find(Builders<T>.Filter.Eq(attribute, value)).ToList();
        }

        public T GetById(string uuid)
        {
            return collection.Find(element => element.Id == uuid).First<T>();
        }

        public T Save(T element)
        {
            if (element == null)
                throw new ArgumentNullException("Element must not be null");

            if (string.IsNullOrEmpty(element.Id))
            {
                collection.InsertOne(element);
            }
            else
            {
                ReplaceOneResult result = collection.ReplaceOne(item => item.Id == element.Id, element);
            }

            return element;
        }

        public IList<T> SaveAll(IList<T> elements)
        {
            var session = client.StartSession();
            IList<T> savedElements = new List<T>();

            try
            {
                session.StartTransaction();

                foreach (T element in elements)
                {
                    savedElements.Add(Save(element));
                }

                session.CommitTransaction();
            }
            catch (Exception ex)
            {
                session.AbortTransaction();
                throw ex;
            }

            return savedElements;
        }

        public bool Delete(string uuid)
        {
            return collection.FindOneAndDelete(element => element.Id == uuid) != null;
        }

        public bool DeleteAll()
        {
            return collection.DeleteMany(Builders<T>.Filter.Empty) != null;
        }
    }
}

