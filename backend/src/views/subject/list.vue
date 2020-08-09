<template>
  <el-row>
    <el-col :span="18" :offset="3">
<el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>
    <el-tree
    accordion
         ref="tree"
      :data="subjectList"
      show-checkbox
      node-key="id"
        :props="defaultProps"
     
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <el-link>{{ node.label }}</el-link>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    </el-col>
  </el-row>
</template>

<script>
import { getSubjectList } from '@/api/subject';
export default {
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    data(){
        return {
            subjectList:[],
            defaultProps: {
                    children: 'children',
                    label: 'title',
                   
                },
            filterText: '',
        }

    },

    created(){
        getSubjectList().then(response=>{
            this.subjectList = response.data.subjectList;
        });
    },
    methods: {
          filterNode(value, data) {
                if (!value) return true;
                return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      },
        append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        console.log(node,data);
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
    },

    

}
</script>

<style scoped>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>