using CefSharp;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CEFExample
{
	public partial class Form1 : Form
	{
		private readonly ChromiumWebBrowser browser;

		public Form1()
		{
			InitializeComponent();
			WindowState = FormWindowState.Maximized;

			string htmlFilePath = Path.Combine(Application.StartupPath, "WebProject", "index.html");

			browser = new ChromiumWebBrowser(htmlFilePath)
			{
				Dock = DockStyle.Fill,
			};

			toolStripContainer1.ContentPanel.Controls.Add(browser);

			browser.IsBrowserInitializedChanged += Browser_IsBrowserInitializedChanged;

			// make the toolstrip container anchored to all sides of the form
			toolStripContainer1.Anchor = AnchorStyles.Top | AnchorStyles.Right | AnchorStyles.Bottom | AnchorStyles.Left;
		}

		private void Browser_IsBrowserInitializedChanged(object sender, IsBrowserInitializedChangedEventArgs e)
		{
			this.InvokeOnUiThreadIfRequired(() => browser.ShowDevTools());
		}
	}
}
