

import java.util.Collections;
import java.util.LinkedList;

public class LinkedListUtils {
	public static void insertSorted(LinkedList<Integer> list, int value) {//the data is already sorted
        
        if(list==null){
            return;
        }
        if(list.isEmpty()) {
        	list.addFirst(value);
        }else if(value>=list.get(list.size()-1)){
            list.addLast(value);
        }else{
            for(int i=0;i<list.size();i++){
                if(value<=list.get(i)){
                    list.add(i, value);
                    break;
                }
            }
        }
        //System.out.println(list);
}


public static void removeMaximumValues(LinkedList<String> list, int N) {
        if(list==null) {
        	return;
        } else if(list.isEmpty()||N<0 ){
            return;
        } else if(list.size()<N) {
        	list.clear();
        	return;
        }
        String max = list.get(0);
        while(N>0){
            for(int i=0;i<list.size();i++){
                if(max.compareTo(list.get(i))<0){
                    max=list.get(i);
                }
            }
            list.removeAll(Collections.singleton(max));
            N--;
            if(list.isEmpty()) {
            	return;
            }
            max=list.get(0);
        }
        //System.out.println(list);
        
}

public static boolean containsSubsequence(LinkedList<Integer> one, LinkedList<Integer> two) {
        boolean isTrue=false;
        int j=0;
        if(one==null || two==null) {
        	return false;
        } else if(one.isEmpty()||two.isEmpty()) {
        	return false;
        }
        for(int i =0;i<one.size();i++){
            if(j>0 && !one.get(i).equals(two.get(j)) ){
                return false;
            }
            if(one.get(i)==two.get(j)){
                isTrue=true;
                j++;
            }
            if(j>two.size()-1){
                break;
            }
        }
        return isTrue;
}
}
