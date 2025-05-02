package com.calmspace.haven;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;
import android.content.res.Resources;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "CalmSpace";
    private int statusBarHeight = 0;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Make app fullscreen (hide status bar completely)
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );
        
        // Additionally set system UI flags for immersive fullscreen mode
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            );
        }
        
        // Get status bar height (useful for debugging but not needed for padding anymore)
        statusBarHeight = getStatusBarHeight();
        Log.d(TAG, "Status bar height: " + statusBarHeight + "px");
        
        // Wait for WebView to be fully initialized
        getBridge().getWebView().post(new Runnable() {
            @Override
            public void run() {
                applyStatusBarHeight();
            }
        });
    }
    
    private void applyStatusBarHeight() {
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            // Set CSS variable for status bar height to 0 since we're hiding it
            String js = "document.documentElement.style.setProperty('--status-bar-height', '0px');" +
                        "console.log('Status bar hidden, setting height to 0px');" +
                        "document.body.classList.add('android-fullscreen');";
            
            webView.evaluateJavascript(js, null);
            Log.d(TAG, "Applied fullscreen mode to WebView");
        } else {
            Log.e(TAG, "WebView is null, cannot apply fullscreen mode");
        }
    }
    
    private int getStatusBarHeight() {
        int height = 0;
        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            height = getResources().getDimensionPixelSize(resourceId);
        } else {
            height = (int) (24 * Resources.getSystem().getDisplayMetrics().density);
        }
        return height;
    }
    
    @Override
    public void onResume() {
        super.onResume();
        
        // Re-enable fullscreen mode when app resumes
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            );
        }
        
        // Reapply status bar height when the app resumes
        getBridge().getWebView().post(new Runnable() {
            @Override
            public void run() {
                applyStatusBarHeight();
            }
        });
    }
}
