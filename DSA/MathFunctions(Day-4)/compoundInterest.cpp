#include<iostream>
#include<cmath>
using namespace std;
int main(){
    double p, r, t;
    cout<<"Enter p, r, t : ";
    cin>>p>>r>>t;
    double ans = p*(pow((1 + (r/100)), t))-p;
    cout<<"Compound Interest : "<<ans<<endl;
    return 0;
}