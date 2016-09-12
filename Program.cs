using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;

namespace CEFExample
{
	static class Program
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main()
		{
			Application.EnableVisualStyles();
			Application.SetCompatibleTextRenderingDefault(false);

			var settings = new CefSettings();
			settings.BrowserSubprocessPath = @"x86\CefSharp.BrowserSubprocess.exe";

			Cef.Initialize(settings, shutdownOnProcessExit: false, performDependencyCheck: false);

			Application.Run(new Form1());
		}
	}
}
