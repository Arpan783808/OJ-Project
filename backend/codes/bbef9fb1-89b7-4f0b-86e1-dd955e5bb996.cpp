#include<bits/stdc++.h>
using namespace std;
 
int main(){
 
    int t;
    cin >> t;
    while(t--){
 
        int a, b, c;
        cin >> a >> b >> c;
 
        (a + b + c) % 2 != 0 ? cout << "-1" << endl : cout << a + min(b, (b + c - a) / 2) << endl;
 
 
    }
    return 0;
}