using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Http;
using System.Net;
using System.Collections.Specialized;

namespace Client
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
                using (var client = new WebClient())
                {
                    var status = client.DownloadString("http://127.0.0.1:5000/status");
                    if (status == "ON")
                    {
                        var values = new NameValueCollection();
                        values["name"] = nazwaKlienta.Text;
                        var response = client.UploadValues("http://127.0.0.1:5000/addClient", values);
                        var responseString = Encoding.Default.GetString(response);
                        //MessageBox.Show(responseString);
                    }
                    else
                    {
                        MessageBox.Show("Server off!");
                    }
                }
            
        }
    }
}
