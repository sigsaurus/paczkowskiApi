using System;
using System.Text;
using Commons;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace paczkowskiApi.security
{
    public class AesEncryption
    {
        private static AesEncryption _instance;

        private AesEncryption() { }

        public static AesEncryption Instance
        {
            get
            {
                if (_instance == null)
                {
                    var configurationBuilder = new ConfigurationBuilder();
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                    configurationBuilder.AddJsonFile(path, false);
                    var root = configurationBuilder.Build();

                    _instance = new AesEncryption();
                    _instance.Key = root.GetSection("AesEncryption")["Key"];
                    _instance.IV = root.GetSection("AesEncryption")["IV"];
                }

                return _instance;
            }
        }

        public string Key { get; set; }
        public string IV { get; set; }
    }

    public static class DataEncryption
    {
        public static string Encrypt<T>(T blob)
        {
            string json = blob.ToJson(); ;
            byte[] encrypetdBytes = GetAesEcnryptedBytes(json);
            string encrypted = Convert.ToBase64String(encrypetdBytes);

            return encrypted;
        }

        public static T Decrypt<T>(string encryptedBlob) where T : new()
        {
            T blob = new T();

            if (encryptedBlob != null)
            {
                byte[] bytes = Convert.FromBase64String(encryptedBlob);
                string decryptedBlob = GetAesDecryptedString(bytes);
                blob = JsonConvert.DeserializeObject<T>(decryptedBlob);
            }

            return blob;
        }

        private static byte[] GetAesEcnryptedBytes(string base64)
        {
            using (var aes = Aes.Create())
            {
                var aesConfig = AesEncryption.Instance;

                aes.Key = Convert.FromBase64String(aesConfig.Key);
                aes.IV = Convert.FromBase64String(aesConfig.IV);

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (var memoryStream = new MemoryStream())
                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                using (var streamWriter = new StreamWriter(cryptoStream))
                {
                    streamWriter.Write(base64);
                    streamWriter.Close();
                    var bytes = memoryStream.ToArray();
                    return bytes;
                }
            }
        }

        private static string GetAesDecryptedString(byte[] bytes)
        {
            using (var aes = Aes.Create())
            {
                var aesConfig = AesEncryption.Instance;

                aes.Key = Convert.FromBase64String(aesConfig.Key);
                aes.IV = Convert.FromBase64String(aesConfig.IV);

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (var memoryStream = new MemoryStream(bytes))
                using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                using (var streamReader = new StreamReader(cryptoStream))
                {
                    var decryptedBlob = streamReader.ReadToEnd();
                    return decryptedBlob;
                }
            }
        }

        private static string ConverToBase64(string s) =>
            Convert.ToBase64String(Encoding.ASCII.GetBytes(s));

        private static string ConvertFromBase64(byte[] bytes) =>
            Encoding.ASCII.GetString(bytes);
    }
}
