#include <bits/stdc++.h>
using namespace std;
class custom_compare{
public:
          bool operator()(pair<string,int>p1,pair<string,int>p2){
          return p1.second<p2.second;
          }
};
int main(){
int t;
cin>>t;
while(t--){
          int transac;
          cin>>transac;
          map< string,int > mp;

          for(int i=0;i<transac;i++){
                  string x,y;
                  int amount;
                  cin>>x>>y>>amount;
                  if(mp.count(x)==0)
                    mp[x]=0;
                  if(mp.count(y)==0)
                    mp[y]=0;
                  mp[x]-=amount;
                  mp[y]+=amount;
          }

          multiset<pair<string,int>,custom_compare> s;
          for(auto it:mp){
                    if(it.second!=0){
                    s.insert(make_pair(it.first,it.second));
                    }
          }
          int cnt=0;
          while(!s.empty()){
                              cnt++;
                    auto low = s.begin();
                    auto high = prev(s.end());

                    string debit_name = low->first;
                    int debit = low->second;
                    string credit_name = high->first;
                    int credit = high->second;

                    int settle = min(-debit,credit);

                    s.erase(low);
                    s.erase(high);

                    debit+=settle;
                    credit-=settle;
                    cout<<debit_name<<" give "<<settle<<" to "<<credit_name<<"\n";
                    if(debit!=0)
                              s.insert(make_pair(debit_name,debit));
                    if(credit!=0)
                              s.insert(make_pair(credit_name,credit));

          }
          cout<<"Minimized number of transactions = "<<cnt<<"\n";
}
}
